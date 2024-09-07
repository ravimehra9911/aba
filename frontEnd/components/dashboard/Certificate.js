import React from 'react';
import { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import Cookies from 'js-cookie';
import fetcher from '@/utils/fetcher';

const Certificate = (props) => {
  const [token, setToken] = useState(Cookies.get('abaToken'));

  const handleDownload = async () => {
    try {
      const response = await fetcher('/api/certificates/downloadCertificate', {
        method: 'POST',
        body: JSON.stringify({
          courseName: props.certificateName,
          courseId: props.id,
          courseInstructor: props.instructor,
          courseCeu: props.ceu,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('abaToken')}`,
        },
      });
      console.log(response);
      // The request was successful.
      if (response.pathToCertificate) {
        // The request was successful.
        const URL = `${process.env.NEXT_PUBLIC_STRAPI_URL}/${response.pathToCertificate}`;
        // const responsePDF = await fetch(URL);
        // const blob = await responsePDF.blob();
        // const blobUrl = window.URL.createObjectURL(blob);
        // const a = document.createElement('a');
        // a.href = blobUrl;
        // a.download = response.certificateName;
        // document.body.appendChild(a);
        // a.click();
        fetch(URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/pdf',
          },
        })
          .then((certRes) => certRes.blob())
          .then((blob) => {
            // Create blob link to download
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${response.certificateName}`);

            // Append to html link element page
            document.body.appendChild(link);

            // Start download
            link.click();

            // Clean up and remove the link
            link.parentNode.removeChild(link);
          });
      } else {
        alert('Cannot View Certificate.');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleView = async () => {
    try {
      const response = await fetcher('/api/certificates/downloadCertificate', {
        method: 'POST',
        body: JSON.stringify({
          courseName: props.certificateName,
          courseId: props.id,
          courseInstructor: props.instructor,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('abaToken')}`,
        },
      });
      console.log(response);
      if (response.pathToCertificate) {
        // The request was successful.
        URL = `${process.env.NEXT_PUBLIC_STRAPI_URL}/${response.pathToCertificate}`;
        window.open(URL, '_blank');
      } else {
        alert('Cannot View Certificate.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p14 font-secondary grid grid-cols-[auto_10%_30%] md:grid-cols-[auto_10%_10%] gap-2  border-b py-2">
      <p className="overflow-hidden text-ellipsis w-full whitespace-nowrap">
        {props.certificateName}
      </p>
      <p className="text-right cursor-pointer" onClick={handleDownload}>
        DOWNLOAD
      </p>
      <p className="text-right cursor-pointer" onClick={handleView}>
        VIEW
      </p>
    </div>
  );
};

export default Certificate;
