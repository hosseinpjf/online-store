import { memo, useEffect, useRef, useState } from "react";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Ratio } from "react-bootstrap";

import styles from "./cropperImages.module.css"

function CropperImages({ formImages, setFormImages }) {
    const cropperRef = useRef(null);
    const [images, setImages] = useState({
        AllImages: [],
        aloneImage: null
    });

    useEffect(() => {
        // console.log({
        //     length: images.AllImages?.length != 0,
        //     every: images.AllImages?.every((val, i) => val.fileImage.name === formImages[i].fileImage.name),
        //     response: images.AllImages?.length != 0 && images.AllImages?.every((val, i) => val.fileImage.name === formImages[i].fileImage.name)
        // });

        if (images.AllImages?.length != 0 && images.AllImages?.every((val, i) => val.fileImage.name === formImages[i]?.fileImage.name)) return
        setImages({ AllImages: [...formImages], aloneImage: formImages[0] });
    }, [formImages])

    const handleCrop = () => {
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

    const cutHandler = name => {
        console.log({ name });
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
        <div className="w-100">
            <div className="d-flex gap-2 justify-content-start align-items-center w-100 overflow-auto p-1 border border-2 border-black" style={{height: '130px'}}>
                {formImages.map(image => (
                    <Ratio
                        onClick={() => cutHandler(image.fileImage.name)}
                        aspectRatio="16x9"
                        key={image.fileImage.name}
                        className={`${image.edited ? 'border border-3 border-success' : 'border border-3 border-danger'}`}
                        style={{ flex: '0 0 200px', cursor: 'pointer' }}
                    >
                        <img
                            className="h-100 w-100 p-1"
                            src={URL.createObjectURL(image.fileImage)}
                            alt=""
                        />
                    </Ratio>
                ))}
            </div>
            <div style={{ height: 400, width: "100%" }} className="border border-2 border-black">
                {images.aloneImage?.fileImage && (
                    <Cropper
                        src={URL.createObjectURL(images.aloneImage.fileImage)}
                        className="w-100 h-100"
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
            <div>
                <button type="button" onClick={() => cropperRef.current.cropper.zoom(0.1)}>
                    زوم +
                </button>
                <button type="button" onClick={() => cropperRef.current.cropper.zoom(-0.1)}>
                    زوم -
                </button>
                <button type="button" onClick={() => cropperRef.current.cropper.rotate(90)}>
                    چرخش ۹۰ درجه
                </button>
                <button type="button" onClick={() => {
                    const cropper = cropperRef.current.cropper;
                    const currentScaleX = cropper.getData().scaleX || 1;
                    cropper.scaleX(currentScaleX === 1 ? -1 : 1);
                }}>
                    انعکاس افقی
                </button>
                <button type="button" onClick={() => {
                    const cropper = cropperRef.current.cropper;
                    const currentScaleY = cropper.getData().scaleY || 1;
                    cropper.scaleY(currentScaleY === 1 ? -1 : 1);
                }}>
                    انعکاس عمودی
                </button>
                <button type="button" onClick={() => cutHandler(undefined)}>
                    برش تصویر
                </button>
            </div>
        </div>
    )
}

export default memo(CropperImages)