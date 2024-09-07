import React from 'react';

const CourseTitle = ({ category }) => {
  return (
    <div className="coursetitle m-p48 w-3/4 mx-auto pt-14 text-center font-primary text-yellowColorDark">
      {/* {category?.data[0]?.attributes?.categoryName} */}

      {category?.data?.map(({ attributes: c, id }) => {
        return (
          <React.Fragment key={id}>
            <span>{c.categoryName}</span>
          </React.Fragment>
        );
      })}
    </div>
    // <h1 className="p96 w-[820px] text-yellowColorDark text-center pt-[100px]">
    //   {title}
    // </h1>
  );
};

export default CourseTitle;
