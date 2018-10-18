import fs from "../firestoreservice";

export async function getRandomTestimonial() {
    let testimonials =  await fs.getCollection('testimonials');
    debugger;
    return testimonials[Math.floor(Math.random() *testimonials.length)].data.testimonial;
}
