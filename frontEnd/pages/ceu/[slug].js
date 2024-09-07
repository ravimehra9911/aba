'use client';

import CourseNew from '@/components/coursepage/CourseNew';
import CourseTitle from '@/components/coursepage/CourseTitle';
import fetchData from '@/utils/api';

const CoursePage = ({ category, courseData }) => {
  // console.log(courseData);
  // console.log(category);
  return (
    <div>
      <div>
        <CourseTitle category={category} />
        <div className="py-16">
          <CourseNew courseData={courseData} />
        </div>
      </div>
    </div>
  );
};

export default CoursePage;

export async function getStaticPaths() {
  const category = await fetchData('/api/categories/');
  const paths = category.data.map((c) => ({
    params: { slug: c.attributes.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const category = await fetchData(
    `/api/categories?[filters][slug][$eq]=${slug}`
  );
  const courseData = await fetchData(
    `/api/courses?populate=*&[filters][category][slug][$eq]=${slug}`
  );

  return {
    props: {
      category,
      courseData,
      slug,
    },
  };
}
