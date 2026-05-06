import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::enrollment.enrollment",
  ({ strapi }) => ({
    async create(ctx) {
      // 1. Save to DB first
      const response = await super.create(ctx);

      const { first_name, last_name, email, phone, courses } =
        ctx.request.body.data;

      // 2. Fetch each selected course title + owner_email
      const courseDetails = await Promise.all(
        courses.map((id: number) =>
          strapi.entityService.findOne("api::coursespage.coursespage", id, {
            fields: ["title", "owner_email"],
          }),
        ),
      );

      // 3. Build course list for email
      const courseList = courseDetails
        .map((c: any) => `<li>${c.title}</li>`)
        .join("");

      // 4. Get unique owner emails
      const ownerEmails = [
        ...new Set(courseDetails.map((c: any) => c.owner_email)),
      ];

      console.log("ownerEmails:", ownerEmails);
      console.log("courseDetails:", JSON.stringify(courseDetails));
      console.log("API Key exists:", !!process.env.ZEPTOMAIL_API_KEY);
      console.log("From email:", process.env.ZEPTOMAIL_FROM_EMAIL);
      // console.log("Full auth header:", `Zoho-enczapikey ${process.env.ZEPTOMAIL_API_KEY}`);


      await Promise.all(
        ownerEmails.map((ownerEmail: any) =>
          fetch("https://api.zeptomail.in/v1.1/email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Zoho-enczapikey ${process.env.ZEPTOMAIL_API_KEY}`,
            },
            body: JSON.stringify({
              from: {
                address: process.env.ZEPTOMAIL_FROM_EMAIL,
                name: "Vedorex Enrollments",
              },
              to: [
                {
                  email_address: {
                    address: ownerEmail,
                    name: "Course Owner",
                  },
                },
              ],
              subject: `[Enrollment] New Request from ${first_name} ${last_name}`,
              htmlbody: `
                <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
                  <h2 style="color:#5C44D8;border-bottom:2px solid #F0EEFF;padding-bottom:10px">
                    New Enrollment Request
                  </h2>
                  <table style="border-collapse:collapse;width:100%">
                    <tr>
                      <td style="padding:10px;border:1px solid #ddd;background:#f8f6ff;width:30%"><b>Name</b></td>
                      <td style="padding:10px;border:1px solid #ddd">${first_name} ${last_name}</td>
                    </tr>
                    <tr>
                      <td style="padding:10px;border:1px solid #ddd;background:#f8f6ff"><b>Email</b></td>
                      <td style="padding:10px;border:1px solid #ddd">${email}</td>
                    </tr>
                    <tr>
                      <td style="padding:10px;border:1px solid #ddd;background:#f8f6ff"><b>Phone</b></td>
                      <td style="padding:10px;border:1px solid #ddd">${phone || "—"}</td>
                    </tr>
                    <tr>
                      <td style="padding:10px;border:1px solid #ddd;background:#f8f6ff"><b>Courses</b></td>
                      <td style="padding:10px;border:1px solid #ddd">
                        <ul style="margin:0;padding-left:16px">${courseList}</ul>
                      </td>
                    </tr>
                  </table>
                  <p style="color:#6B5DB5;font-size:12px;margin-top:16px">
                    Sent via Vedorex Enrollment Form
                  </p>
                </div>
              `,
            }),
          }).then(async (res) => {
            const body = await res.json();
            if (!res.ok) {
              console.error("Zeptomail error:", JSON.stringify(body));
            } else {
              console.log("Email sent to:", ownerEmail);
              console.log("Zeptomail response:", JSON.stringify(body));
            }
          }),
        ),
      );

      return response;
    },
  }),
);
