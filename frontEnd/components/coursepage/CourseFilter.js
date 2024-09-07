import React from 'react';

const CourseFilter = () => {
  return (
    <div className="space-x-4 flex justify-center pt-[50px]">
      <select
        className="p14 font-interstateRegular border rounded-md p-4"
        name="searchTopics"
      >
        <option>SEARCH TOPICS</option>
        <option>TOPIC 1</option>
        <option>TOPIC 2</option>
        <option>TOPIC 3</option>
      </select>

      <select
        className="p14 font-interstateRegular border rounded-md p-4"
        name="typeOfCeu"
      >
        <option>TYPE OF CEU</option>
        <option>CEU 1</option>
        <option>CEU 2</option>
        <option>CEU 3</option>
      </select>

      <select
        className="p14 font-interstateRegular border rounded-md p-4"
        name="ceuCredits"
      >
        <option>CEU CREDITS</option>
        <option>CEU 1</option>
        <option>CEU 2</option>
        <option>CEU 3</option>
      </select>
    </div>
  );
};

export default CourseFilter;
