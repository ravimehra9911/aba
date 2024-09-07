import React, { useContext, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/Button';
import RatingReview from './RatingReview';
import fetcher from '@/utils/fetcher';
import Cookies from 'js-cookie';

const Course = (props) => {
  const [rating, setRating] = useState(props.rating);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState(Cookies.get('abaToken'));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccess(false);
    setError(null);
    try {
      const response = await fetcher('/api/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          course: props.id,
          courseRating: rating,
        }),
      });

      console.log('Rating submitted:', response);
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    }
  };
  console.log(props);
  const ImageUrl = 'https://aba.ravimehra.in';
  return (
    <section className="px-4 py-4">
      <div className="border p-[19px] md:flex">
        <div className="h-52 mb-8 md:mr-6 overflow-hidden rounded-lg">
          <Image
            // src={`${ImageUrl}${props.courseImage.url}`}
            src="/assets/images/course1.jpeg"
            alt="course image"
            width={800}
            height={800}
          />
        </div>

        <div className="space-y-4">
          <div className="md:flex justify-between">
            <p className="p14 font-secondary">CEU: {props.title}</p>
            <p className="p14 font-secondary">Instructor: {props.instructor}</p>
          </div>
          <p className="p14 font-secondary">Date: 2023-05-01</p>
          <p className="p14 font-secondaryLight">
            <span className="p14 font-secondary">Course Description:</span>
            {props.description}
          </p>
          <div className="flex justify-between items-end">
            <Link href={props.courseUrl ? props.courseUrl : ''} target="_blank">
              <Button name="WATCH NOW" cssName="hover:bg-grey10" />
            </Link>

            <form onSubmit={handleSubmit}>
              <RatingReview rating={rating} setRating={setRating} />
              {error && <p style={{ color: 'red' }}>{error}</p>}
              {success && (
                <p style={{ color: 'green' }}>Rating submitted successfully!</p>
              )}
              <Button
                name="Submit Rating"
                type="submit"
                cssName="hover:bg-grey10"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Course;

// import React, { useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import Button from '@/components/Button';
// import RatingReview from './RatingReview';
// import fetcher from '@/utils/fetcher';
// import Cookies from 'js-cookie';

// const Course = (props) => {
//   const [rating, setRating] = useState(0);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);
//   const [token, setToken] = useState(Cookies.get('abaToken'));

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setSuccess(false);
//     setError(null);
//     try {
//       const data = await fetcher('/api/ratings', {
//         // Adjust the URL as necessary
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ rating }),
//       });

//       if (!data.ok) {
//         throw new Error('Failed to submit rating');
//       }

//       const response = await response.json();
//       console.log('Rating submitted:', data);
//       setSuccess(true);
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const ImageUrl = 'https://aba.ravimehra.in';
//   return (
//     <section className="px-4 py-4">
//       <div className="border p-[19px] md:flex">
//         <div className="h-52 mb-8 md:mr-6 overflow-hidden rounded-lg">
//           <Image
//             //  src={`${ImageUrl}${props.courseImage.url}`}
//             src="/assets/images/course1.jpeg"
//             alt="course image"
//             width={420}
//             height={240}
//           />
//         </div>

//         <div className="space-y-4">
//           <div className="md:flex justify-between">
//             <p className="p14 font-secondary">CEU: {props.title}</p>
//             <p className="p14 font-secondary">Instructor: {props.instructor}</p>
//           </div>
//           <p className="p14 font-secondary">Date: 2023-05-01</p>
//           <p className="p14 font-secondaryLight">
//             <span className="p14 font-secondary">Course Description:</span>
//             {props.description}
//           </p>
//           <div className="flex justify-between items-center">
//             <Link href={props.courseUrl ? props.courseUrl : ''} target="_blank">
//               <Button name="WATCH NOW" cssName="hover:bg-grey10" />
//             </Link>

//             <form onSubmit={handleSubmit}>
//               <RatingReview rating={rating} setRating={setRating} />
//               {error && <p style={{ color: 'red' }}>{error}</p>}
//               {success && (
//                 <p style={{ color: 'green' }}>Rating submitted successfully!</p>
//               )}
//               <Button
//                 name="Submit Rating"
//                 type="submit"
//                 cssName="hover:bg-grey10"
//               />
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Course;
