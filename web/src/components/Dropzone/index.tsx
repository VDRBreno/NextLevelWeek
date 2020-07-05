import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

import './styles.css';

interface Props {
    onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {
    const [selectedFileUrl, setSelectedFileUrl] = useState('');

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];

        const fileUrl = URL.createObjectURL(file);

        setSelectedFileUrl(fileUrl);
        onFileUploaded(file);
    }, [onFileUploaded]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*'
    });

    return (
        <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} accept="image/*"/>

            {   
                selectedFileUrl ?
                <p className="fileSelectedP"><img src={selectedFileUrl} alt="Point thumbnail" />Imagem errada?<br/>Não se preocupe, arraste novamente um novo arquivo ou <br/> clique na imagem para substitui-la.</p> :
                (
                    isDragActive ?
                    <p><FiUpload />Coloque a imagem aqui ...</p> :
                    <p><FiUpload />Arraste a imagem aqui, ou clique para buscar em seu aparelho</p>
                )
            }

            
        </div>
    );
}

export default Dropzone;