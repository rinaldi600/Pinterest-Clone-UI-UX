import "./ContentComponent.css";
import {useEffect, useRef, useState} from "react";
import { useSelector, useDispatch } from 'react-redux'
import {showNavbar, closeNavbar} from "../Redux/Features/statusNavbar";
import imageTest from '../img/antoine-dautry-_zsL306fDck-unsplash.jpg'
import errorImage from '../img/brett-jordan-XWar9MbNGUY-unsplash (1).jpg';
import loadingImages from '../img/icons/loading.png';
import DeleteComponent from "./DeleteComponent/DeleteComponetButton";
import axios from "axios";
import * as React from "react";

function ContentComponent(props) {

    const[dataImages, setDataImages] = useState([]);
    const [showPreviewImage, setPreviewImage] = useState(false);
    const [validationImage, setValidationImage] = useState(false);
    const [uploadedFile, setUploadedFile] = useState([]);
    const [uploadButton, setUploadButton] = useState(false);
    const [elementDelete, setElementDelete] = useState('');
    const [elementIndex, setElementIndex] = useState(-1);
    const [index, setIndex] = useState(-1);
    const [lengthImageData, setLengthImageData] = useState(-1);
    const elementRef = useRef();
    const imgRef = useRef();
    const status = useSelector((state => state.status.value));
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`http://127.0.0.1:4000/file`)
            .then(success => {
                setDataImages(success.data);
                setLengthImageData(success.data.length);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);


    const getDetailFile = (e) => {
        const files = e.files;
        if (files.length >= 1) {
            setPreviewImage(true);
            const typeFile = files[0].type.split('/')[0];
            if (typeFile !== 'image') {
                console.log("FAILS");
                imgRef.current.src = errorImage;
                setValidationImage(true);
                return false;
            }
            setUploadButton(true);
            setValidationImage(false);
            setUploadedFile(files);
            imgRef.current.src = URL.createObjectURL(files[0]);
        } else {
            setUploadButton(false);
            setPreviewImage(false);
        }
    };

    useEffect(() => {
        console.log("WORK");
    },[uploadedFile]);

    const upload = () => {
        elementRef.current.click();
    };

    const up = () => {
        console.log(uploadedFile[0]);
        const formData = new FormData();
        formData.append("photo", uploadedFile[0]);
        axios.post(`http://localhost:4000/file/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((success) => {
                axios.get(`http://127.0.0.1:4000/file`)
                    .then(success => {
                        setDataImages(success.data);
                        setLengthImageData(success.data.length);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => dispatch(closeNavbar()))
    };

    const getlengthImageNew = (num) => {
      setLengthImageData(num);
    };

    useEffect(() => {
        axios.get(`http://127.0.0.1:4000/file`)
            .then(success => {
                setDataImages(success.data);
                setLengthImageData(success.data.length);
            })
            .catch(error => {
                console.log(error);
            })
    }, [lengthImageData]);

    const showButtonDelete = (event, index, idImage) => {
        const indexElement = event.target.parentElement.children[1].classList.value.split('-')[2];
        if (indexElement == index) {
            setElementIndex(indexElement);
            setIndex(index);
            setElementDelete(<DeleteComponent number={idImage} getlengthImageNew={getlengthImageNew}/>)
        }
    };

    const hideButtonDelete = () => {
        setElementDelete(null)
    };

    return (

        <div className={"content w-full min-h-screen relative"}>
            <div className="cover-content w-11/12 justify-center gap-2 mx-auto">
                {
                    dataImages.length === 0 ?
                        <img src={loadingImages} alt="Loading"/> :
                        dataImages.map((element, index) => (
                            <div onMouseEnter={(event) => showButtonDelete(event, index, element._id)} onMouseLeave={hideButtonDelete} className={`banner w-52 h-max relative overflow-hidden`}>
                                <img className={"rounded-lg image"} src={`http://127.0.0.1:4000/${element.filePath}`} alt=""/>
                                <div className={`delete-cover-${index}`}>{elementIndex == index ? elementDelete : ''}</div>
                            </div>
                        ))

                }
            </div>
            <div className={`upload-image md:w-5/12 w-4/12 h-96 absolute inset-0 z-50 rounded-lg bg-white mx-auto grid justify-center content-center ${status === 'show' ? '' : 'hidden'}`}>
                <svg onClick={() => dispatch(closeNavbar())} xmlns="http://www.w3.org/2000/svg" className={`h-10 w-10 cursor-pointer ${showPreviewImage ? 'z-50' : ''} absolute top-0 right-0 p-2`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className={`sm:w-16 sm:h-16 h-32 w-32 mx-auto`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className={`w-full h-60 ${showPreviewImage ? '' : 'hidden'} rounded-t-lg absolute inset-0`}>
                    <img src={imageTest} ref={imgRef} className={"rounded-t-lg h-52 w-full"} alt=""/>
                </div>
                <p className={`text-center ${showPreviewImage ? 'hidden' : ''}`}>Upload Foto Disini</p>
                <div className="cover-upload grid justify-center content-center">
                    <input className={"upload mx-auto"} ref={elementRef} onChange={(event) => getDetailFile(event.target)} type="file" hidden={true}/>
                    <p className={`text-xs mt-3 text-red-600 ${validationImage ? '' : 'hidden'}`}>The file you uploaded is not an image</p>
                    <button className={`p-2 bg-red-500 ${showPreviewImage ? 'sm:mt-24' : ''} mt-2 rounded-lg`} onClick={upload} type={"button"}>Choose File</button>
                </div>

                <div className="cover-upload grid justify-center content-center">
                    <button onClick={up} className={`p-2 bg-red-500 mt-2 flex gap-1 text-white rounded-lg ${uploadButton ? '' : 'hidden'} ${validationImage ? 'hidden' : ''}`} type={"button"}>
                        Upload
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                        </svg>
                    </button>
                </div>
            </div>

            <div className={`flex justify-center items-center gap-2 navigation rounded-3xl bg-white h-14 fixed top-3/4 bottom-2/4 w-52 2xl:hidden md:w-5/12 sm:w-11/12`}>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <div >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                    </svg>
                </div>
                <div>
                    <svg onClick={() => dispatch(showNavbar())} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default ContentComponent;