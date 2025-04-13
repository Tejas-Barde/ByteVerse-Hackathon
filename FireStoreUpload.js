const admin = require("firebase-admin");
const fs = require("fs");
const serviceAccount = JSON.parse(fs.readFileSync("serviceAccountKey.json", "utf8"));
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
const rawData = fs.readFileSync("trustified_data.json", "utf8");
const products = JSON.parse(rawData);
function generateDocID(brand, product) {
  return `${brand}_${product}`
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "_") 
    .replace(/_+/g, "_") 
    .trim();
}
async function uploadData() {
  const collectionRef = db.collection("trustified_data");

  for (let product of products) {
    const brand = product["Brand Name"] || "UnknownBrand";
    const productName = product["Product Name"] || "UnknownProduct";
    const docID = generateDocID(brand, productName);

    const docRef = collectionRef.doc(docID);
    await docRef.set({
      brand_name: brand,
      product_name: productName,
      batch_no: product["Batch No. Tested"] || "N/A",
      published_date: product["Published Date"] || "N/A",
      tested_by: product["Tested By"] || "N/A",
      testing_status: product["Testing Status"] || "N/A",
      image_url: product["Image URL"] || "N/A",
      report_url: product["Link to Test Report"] || "N/A"
    });
  }

  console.log("Upload complete!");
}

uploadData().catch(console.error);

