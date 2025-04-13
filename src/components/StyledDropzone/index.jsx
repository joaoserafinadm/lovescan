import React, { useMemo } from 'react';
import { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';


const acceptStyle = {
    opacity: ".6",
    borderStyle: 'dashed',
    transition: 'border .2s ease-in-out',
    borderColor: '#00e676',
    borderWidth: 1.5,
    borderRadius: 5,
};

const rejectStyle = {
    opacity: ".6",
    borderStyle: 'dashed',
    transition: 'border .2s ease-in-out',
    borderColor: '#ff1744',
    borderWidth: 1.5,
    borderRadius: 5,
};

export default function StyledDropzone(props) {

    const baseStyle = props.baseStyle ? {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderWidth: 1.5,
        borderRadius: 5,
        borderColor: '#bdbdbd',
        borderStyle: 'dashed',
        // backgroundColor: '#212529',
        color: '#696969',
        outline: 'none',
        transition: 'border .24s ease-in-out'
    } : {
    
    };

    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
        acceptedFiles,
    } = useDropzone({
        accept: props.img ? { 'image/*': [] } : props.pdf ? { 'application/pdf': [] } : props.img && props.pdf ? { 'image/*': [], 'application/pdf': [] } : false,
        noClick: false,
        maxFiles: props.multiFiles ? false : 1
        // maxSize: 16777216
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragAccept,
        isDragReject
    ]);

    useEffect(() => {
        props.setFiles(acceptedFiles)
    }, [acceptedFiles.length])

    return (
        <span className="container" type="button">
            <div {...getRootProps({ style })}>
                {props.children}
                <input {...getInputProps()} />
            </div>
            {/* <aside>
                <h4>Files</h4>
                <ul>{files}</ul>
            </aside> */}
        </span>
    );
}