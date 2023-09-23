'use client';
import { uploadToS3 } from '@/lib/s3';
import { Inbox } from 'lucide-react';
import React from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = () => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      console.log(acceptedFiles);
      const file = acceptedFiles[0];

      if (file.size > 10 * 1024 * 1024) {
        alert('File is too large. Please upload a file smaller than 10MB.');
        return
      }

      try {
        const data = await uploadToS3(file);
        console.log(data);
      } catch (error) {
        console.log(error);
      }

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

/*
Add the following CORS to our S3 bucket:

[{
  "AllowedHeaders": ["*"],
  "AllowedMethods": ["GET", "HEAD", "PUT", "POST", "DELETE"],
  "AllowedOrigins": ["*"],
  "ExposeHeaders": []
}]
*/
