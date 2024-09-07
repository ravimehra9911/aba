'use strict';
const pdfKit = require('pdfkit');
const fs = require('fs');
const path = require('path')
/**
 * certificate controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::certificate.certificate', () => ({

    async downloadCertificate(ctx) {
    const { id, fullName } = ctx.state.user;
    const { courseName, courseId, courseInstructor } = ctx.request.body;
    const certificateUniqueNumber = `${fullName.slice(0,3)}-${id}-${courseId}`;
    console.log(id, fullName)
    
    const course = await strapi.entityService.findOne("api::course.course", courseId, {
      populate: { category: true }, // Include the courses relation when retrieving the user
    }); 
        
      const courseCeu = course.category.categoryName

    try {
      // Create a new PDF document
      const pdfDocument = new pdfKit({
        layout: 'landscape',
        size: 'A4',
      });
      pdfDocument.pipe(fs.createWriteStream(path.resolve(__dirname,`../../../../public/certificates/${certificateUniqueNumber}-certificate.pdf`)))

      // Read the certificate image file as a buffer
      console.log(path.resolve(__dirname, "../../../../public/assets/certificate.jpg"))
      // const image = fs.readFileSync(path.resolve(__dirname, "../../../../public/assets/certificate.jpg"));
      pdfDocument.image(path.resolve(__dirname, "../../../../public/assets/certificateTemplate.jpg"), 0, 0, { fit: [pdfDocument.page.width, pdfDocument.page.height] });

      // Add the user's name as text on top of the image
      pdfDocument.font(path.resolve(__dirname, "../../../../public/fonts/Interstate-Regular-Font.ttf"))
      .fontSize(12)
      .fillColor('black')
      .text(fullName, 50, 195, { "align": "center" });
      // Certificate Unique Number
      pdfDocument.font(path.resolve(__dirname, "../../../../public/fonts/Interstate-Regular-Font.ttf"))
      .fontSize(12)
      .fillColor('black')
      .text(certificateUniqueNumber, 50, 230, {"align":"center"});
      // Course Name
      pdfDocument.font(path.resolve(__dirname, "../../../../public/fonts/Interstate-Regular-Font.ttf"))
      .fontSize(12)
      .fillColor('black')
      .text(courseName, 50, 265, { "align": "center" });
      // instructor
      pdfDocument.font(path.resolve(__dirname, "../../../../public/fonts/Interstate-Regular-Font.ttf"))
      .fontSize(12)
      .fillColor('black')
      .text(courseInstructor, 50, 300, {"align":"center"});
      // Ceu
      pdfDocument.font(path.resolve(__dirname, "../../../../public/fonts/Interstate-Regular-Font.ttf"))
      .fontSize(12)
      .fillColor('black')
      .text(courseCeu, 50, 335, { "align": "center" });
// Date 1
      pdfDocument.font(path.resolve(__dirname, "../../../../public/fonts/Interstate-Regular-Font.ttf"))
      .fontSize(12)
      .fillColor('black')
        .text("Date 1", 730, 375);
      // Date 2
        pdfDocument.font(path.resolve(__dirname, "../../../../public/fonts/Interstate-Regular-Font.ttf"))
        .fontSize(12)
        .fillColor('black')
        .text("Date 2", 150, 375);

      pdfDocument.end();
      return {
        pathToCertificate: `certificates/${certificateUniqueNumber}-certificate.pdf`,
        certificateName: `${certificateUniqueNumber}-certificate.pdf`
      }

    } catch (error) {
      console.log(error);
            console.log(error)
            return ctx.throw(500, 'Internal server error');
          }
  },
  
    })
);
