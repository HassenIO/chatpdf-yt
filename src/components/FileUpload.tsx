'use client';
import { Inbox } from 'lucide-react';
import React from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = () => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
    },
  });

  return (
    <div className="p-2 bg-white rounded-xl">
      <div {...getRootProps({
        className: 'border-dashed border-2 rounded-xl bg-gray-100 cursor-pointer py-8 flex justify-center items-center flex-col',
      })}>
        <input {...getInputProps()} />
        <Inbox className="w-12 h-12 text-gray-400" />
        <p className="mt-2 text-sm text-slate-400">Drop your PDF here</p>
      </div>
    </div>
  )
}

export default FileUpload;
