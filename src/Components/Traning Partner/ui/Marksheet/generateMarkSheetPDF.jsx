import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const generateMarkSheetPDF = (student) => {
  const docDefinition = {
    content: [
      { text: 'Centurion University of Technology and Management', style: 'header' },
      { text: '(NCVET recognized Awarding Body)', style: 'subheader' },
      { text: 'Scheme- XXXXXX', style: 'subheader' },
      { text: 'M A R K S H E E T', style: 'title' },
      { text: `Name of Candidate: ${student.name}`, style: 'body' },
      { text: `Son/Daughter/Ward of: ${student.parentName}`, style: 'body' },
      { text: `Qualification Name: ${student.qualification}`, style: 'body' },
      { text: `Qualification Code: ${student.qualificationCode}`, style: 'body' },
      { text: `NSQF Level: ${student.nsqfLevel}`, style: 'body' },
      { text: `Sector: ${student.sector}`, style: 'body' },
      { text: `Duration: ${student.duration}`, style: 'body' },
      { text: `Candidate Registration No.: ${student.registrationNo}`, style: 'body' },
      { text: `Date of Birth: ${student.dob}`, style: 'body' },
      { text: `Assessment Batch No.: ${student.batchNo}`, style: 'body' },
      { text: `Assessment Agency: ${student.assessmentAgency}`, style: 'body' },
      { text: `Assessment Date: ${student.assessmentDate}`, style: 'body' },
      {
        table: {
          body: [
            ['NOS Code', 'NOS Name', 'NOS Type', 'Maximum Marks', 'Marks Obtained'],
            ...student.marks.map((mark, index) => [
              index + 1,
              mark.name,
              mark.type,
              mark.maxMarks,
              mark.obtainedMarks,
            ]),
            ['Total Marks Obtained', student.totalMarks],
            ['Grade', student.grade],
            ['Result', student.result],
          ],
        },
      },
      { text: `Date of Issue: ${student.issueDate}`, style: 'body' },
      { text: `Certificate No.: ${student.certificateNo}`, style: 'body' },
    ],
    styles: {
      header: { fontSize: 18, bold: true, alignment: 'center', margin: [0, 20, 0, 10] },
      subheader: { fontSize: 14, alignment: 'center' },
      title: { fontSize: 16, bold: true, alignment: 'center', margin: [0, 10, 0, 20] },
      body: { fontSize: 12, margin: [0, 10, 0, 10] },
    },
  };

  pdfMake.createPdf(docDefinition).download(`${student.name}_MarkSheet.pdf`);
};

export default generateMarkSheetPDF;
