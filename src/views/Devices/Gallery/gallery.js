import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { get_data } from "../../../actions/index";
import { Galleria } from "primereact/galleria";
import Header from "../../../components/generals/header";
import styles from "../../../css/devices/Gallery.module.css";
import Loading from "../../../components/generals/loading";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";

export default function Gallery() {
    const galleria = useRef(null);
    const { code } = useParams();
    const [images, setImages] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);

    function arrayBufferToBase64(buffer) {
        var binary = "";
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => (binary += String.fromCharCode(b)));
        return window.btoa(binary);
    }

    function convertBase64(item) {
        let base64Flag = "data:image/jpeg;base64,";
        let imageStr = arrayBufferToBase64(item.buffer.data);
        return base64Flag + imageStr;
    }

    const getImages = async () => {
        let response = await get_data("thiefImage", parseInt(code));
        if (response.data && response.data.result === null) {
            setLoading(false);
        } else if (response.data && response.data.result !== null) {
            setLoading(false);
            setImages(response.data);
        }
    };

    useEffect(() => {
        getImages();
    }, []);

    const responsiveOptions = [
        {
            breakpoint: "1024px",
            numVisible: 5,
        },
        {
            breakpoint: "768px",
            numVisible: 3,
        },
        {
            breakpoint: "560px",
            numVisible: 1,
        },
    ];

    const itemTemplate = (item) => {
        let convert = convertBase64(item);
        return (
            <div style={{display:"flex", flexDirection:"column", justifyContent: "space-between", alignItems: "center"}}>
                <img
                    src={convert}
                    alt="..."
                    className={styles.imgGalleriaVisible}
                    style={{ display: "inline-block", height: "90%", zIndex: "-1", width: "80%"}}
                />
                <a href={convert} className="btn btn-primary" download={`img-${item.name}`} style={{marginTop: "0.5rem"}}>
                    <i className="fas fa-download" style={{paddingRight: "0.5rem"}}></i>
                    Descargar
                </a>
            </div>
        );
    };

    const thumbnailTemplate = (item) => {
        let convert = convertBase64(item);
        return <img src={convert} alt="..." style={{ display: "block"}} />;
    };

    
    function downloadArray (info) {
        Swal.fire({
            title: '¿Está seguro que quiere descargar todas las imágenes?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0D6EFD',
            cancelButtonColor: '#DC3545',
            confirmButtonText: '¡Sí, descargar!',
            cancelButtonText: '¡No, cancelar!',
          }).then((result) => {
            if (result.isConfirmed) {
                if(info && info !== null) {  
                    let imagesArray = info;
                    let downloadLink;
                    imagesArray.forEach((image, indice, array) => {
                        let convert = convertBase64(image);
                        downloadLink = document.createElement("a");
                        downloadLink.href = convert;
                        downloadLink.download = `img-${image.name}`;
                        downloadLink.click();
                    });
                };
                Swal.fire({
                    title:'¡Descarga realizada!',
                    icon:'success',
                    confirmButtonColor: '#0D6EFD',
                    confirmButtonText: 'Ok',
                    showCancelButton: false,
                })
            }
        });    
    };
    
    return (
        <div className="content-wrapper containerHeight">
            <Header title={`Caso de extravio ${code}`} />
            <div
                className={`container-toggle ${styles.btns}`}
            >
                <Button onClick={() => downloadArray(images)} variant="dark">
                    <i
                        className="fas fa-download"
                        style={{ marginRight: "0.5rem" }}
                    ></i>
                    Descargar
                </Button>
            </div>
            {loading === true ? (
                <Loading color="primary" />
            ) : images === null ? (
                <p>No existen imágenes para mostrar.</p>
            ) : images !== null ? (
                <>
                    <Galleria
                        ref={galleria}
                        value={images}
                        responsiveOptions={responsiveOptions}
                        numVisible={5}
                        style={{ maxWidth: "850px"}}
                        activeIndex={activeIndex}
                        onItemChange={(e) => setActiveIndex(e.index)}
                        circular
                        fullScreen
                        showItemNavigators
                        showThumbnails={false}
                        item={itemTemplate}
                        thumbnail={thumbnailTemplate}
                    />

                    <div className={styles.grid}>
                        {images && images !== null ? (
                            images.map((image, index) => {
                                let convert = convertBase64(image);
                                let imgEl = (
                                    <img
                                        className={styles.imagenes}
                                        src={convert}
                                        alt="img"
                                        style={{ cursor: "pointer", width: "100%"}}
                                        onClick={() => {
                                            setActiveIndex(index);
                                            galleria.current.show();
                                        }}
                                    />  
                                );

                                return (
                                    <div className={styles.imgContainer} key={`img${index}`}>
                                        {imgEl}
                                    </div>
                                );
                            })
                        ) : (
                            <></>
                        )}
                    </div>
                </>
            ) : null}
        </div>
    );
}
