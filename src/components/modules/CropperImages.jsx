import { memo, useEffect, useRef, useState } from "react";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Accordion, Button, Ratio } from "react-bootstrap";
import { GoZoomIn } from "react-icons/go";
import { GoZoomOut } from "react-icons/go";
import { GiAnticlockwiseRotation } from "react-icons/gi";
import { GiClockwiseRotation } from "react-icons/gi";
import { PiFlipHorizontalFill } from "react-icons/pi";
import { PiFlipVerticalFill } from "react-icons/pi";
import { GrStatusGood } from "react-icons/gr";

import styles from "./cropperImages.module.css"

function CropperImages({ formImages, setFormImages }) {
    const cropperRef = useRef(null);
    const [images, setImages] = useState({
        AllImages: [],
        aloneImage: null
    });
    const [accordionKey, setAccordionKey] = useState(null)

    useEffect(() => {
        if (!!formImages.length) {
            setAccordionKey("0");
        }
        else {
            setAccordionKey(null);
        }

        if (images.AllImages?.length != 0 && images.AllImages?.every((val, i) => val.fileImage.name === formImages[i]?.fileImage.name)) return
        setImages({ AllImages: [...formImages], aloneImage: formImages[0] });
    }, [formImages])

    const handleCrop = () => {
        console.log("rendered");
        const cropper = cropperRef.current?.cropper;
        if (cropper) {
            const originalName = images.aloneImage.fileImage.name;
            cropper.getCroppedCanvas().toBlob((blob) => {
                if (blob) {
                    const fileImage = new File([blob], originalName, { type: blob.type });
                    const pictures = [...formImages.map(formImage => formImage.fileImage.name == fileImage.name ? { fileImage, edited: true } : formImage)];
                    setFormImages(prevForm => ({ ...prevForm, images: [...pictures] }));
                }
            }, images.aloneImage.type, .9);
        }
    };

    const cutHandler = async name => {
        console.log("rendered");
        if (name) {
            const showImage = images.AllImages.find(image => image.fileImage.name == name);
            setImages({ ...images, aloneImage: showImage })
        }
        else {
            handleCrop();
            const showImage = images.AllImages.findIndex(image => image.fileImage.name == images.aloneImage.fileImage.name);
            setImages({ ...images, aloneImage: (images.AllImages[showImage + 1]) || (images.AllImages[0]) });
        }
    }

    console.log({ images, formImages });

    return (
        <Accordion activeKey={accordionKey} onSelect={key => setAccordionKey(key)}>
            <Accordion.Item className="bg-surface overflow-hidden border-1 border-neutral" eventKey="0">
                <Accordion.Header className="bg-surface">تنظیمات عکس</Accordion.Header>
                <Accordion.Body className="w-100 pt-0 px-2 px-sm-3">
                    {!!images.AllImages.length ? (
                        <>
                            <div className={`${styles.scrollBar} position-relative mb-3`}>
                                <Button onClick={e => e.target.parentElement.children[1].scrollLeft -= 250} className="position-absolute top-50 start-0 translate-middle-y z-1 bg-secondary border-0 rounded-circle fs-5 opacity-50 p-0 ms-2" type="button">»</Button>
                                <div className="d-flex gap-2 justify-content-start align-items-center w-100 overflow-auto p-1" style={{ height: '145px', scrollBehavior: 'smooth' }}>
                                    {formImages.map(image => (
                                        <Ratio
                                            onClick={() => cutHandler(image.fileImage.name)}
                                            aspectRatio="16x9"
                                            key={image.fileImage.name}
                                            className={`${image.edited ? 'border border-3 border-success' : 'border border-3 border-error'} rounded-2`}
                                            style={{ flex: '0 0 200px', cursor: 'pointer' }}
                                        >
                                            <img
                                                className="h-100 w-100 p-1 rounded-3"
                                                src={URL.createObjectURL(image.fileImage)}
                                                alt=""
                                            />
                                        </Ratio>
                                    ))}
                                </div>
                                <Button onClick={e => e.target.parentElement.children[1].scrollLeft += 250} className="position-absolute top-50 end-0 translate-middle-y z-1 bg-secondary border-0 rounded-circle fs-5 opacity-50 p-0 me-2" type="button">«</Button>
                            </div>
                            <div className={`${styles.boxCropper} d-flex flex-column flex-md-row-reverse gap-2 gap-md-0`}>
                                <CropperSection aloneImage={images.aloneImage} cropperRef={cropperRef} />
                                <div className="color-side-svg d-flex flex-wrap column-gap-1 column-gap-sm-2 row-gap-2 flex-md-column align-items-start">
                                    <Button type="button" onClick={() => cropperRef.current.cropper.zoom(0.1)} className="bg-link border-0 rounded-2 flex-grow-1 flex-sm-grow-0 flex-md-grow-1">
                                        <GoZoomIn fontSize="20px" />
                                    </Button>
                                    <Button type="button" onClick={() => cropperRef.current.cropper.zoom(-0.1)} className="bg-link border-0 rounded-2 flex-grow-1 flex-sm-grow-0 flex-md-grow-1">
                                        <GoZoomOut fontSize="20px" />
                                    </Button>
                                    <Button type="button" onClick={() => cropperRef.current.cropper.rotate(-90)} className="bg-link border-0 rounded-2 flex-grow-1 flex-sm-grow-0 flex-md-grow-1">
                                        <GiAnticlockwiseRotation fontSize="20px" />
                                    </Button>
                                    <Button type="button" onClick={() => cropperRef.current.cropper.rotate(90)} className="bg-link border-0 rounded-2 flex-grow-1 flex-sm-grow-0 flex-md-grow-1">
                                        <GiClockwiseRotation fontSize="20px" />
                                    </Button>
                                    <Button type="button" onClick={() => {
                                        const cropper = cropperRef.current.cropper;
                                        const currentScaleX = cropper.getData().scaleX || 1;
                                        cropper.scaleX(currentScaleX === 1 ? -1 : 1);
                                    }} className="bg-link border-0 rounded-2 flex-grow-1 flex-sm-grow-0 flex-md-grow-1">
                                        <PiFlipHorizontalFill fontSize="20px" />
                                    </Button>
                                    <Button type="button" onClick={() => {
                                        const cropper = cropperRef.current.cropper;
                                        const currentScaleY = cropper.getData().scaleY || 1;
                                        cropper.scaleY(currentScaleY === 1 ? -1 : 1);
                                    }} className="bg-link border-0 rounded-2 flex-grow-1 flex-sm-grow-0 flex-md-grow-1">
                                        <PiFlipVerticalFill fontSize="20px" />
                                    </Button>
                                    <Button type="button" onClick={() => cutHandler(undefined)} className="bg-success border-0 rounded-2 flex-grow-1 w-100">
                                        <GrStatusGood fontSize="20px" />
                                    </Button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <p className="text-center color-error">لطفا فایل خود را انتخاب کنید</p>
                    )}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default memo(CropperImages)

const CropperSection = memo(({ aloneImage, cropperRef }) => {
    return (
        <div style={{ height: '400px', width: "100%" }} className="overflow-hidden rounded-2">
            {aloneImage?.fileImage && (
                <Cropper
                    src={URL.createObjectURL(aloneImage.fileImage)}
                    className="w-100"
                    style={{ height: '400px' }}
                    initialAspectRatio={16 / 9}
                    aspectRatio={16 / 9}
                    viewMode={1}
                    guides={true}
                    ref={cropperRef}
                    dragMode="move"
                    zoomOnWheel={false}
                    zoom={(e) => {
                        const ratio = e.detail.ratio;
                        if ((ratio > 2) || (ratio < 0.1)) {
                            e.preventDefault();
                        }
                    }}
                />
            )}
        </div>
    )
})