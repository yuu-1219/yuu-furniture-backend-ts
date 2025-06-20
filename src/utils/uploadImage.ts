import fs from "fs";
import path from "path";
import AWS from "aws-sdk";

const baseImgUrl: string  = "https://yuu-furniture-imgs.s3.ap-northeast-1.amazonaws.com/products" as string

const s3 = new AWS.S3({
    region: process.env.AWS_REGION,
});

async function uploadImage(localFilePath: string, s3Key: string) {
    const fileContent = fs.readFileSync(localFilePath);
    const params = {
        Bucket: "yuu-furniture-imgs",
        Key: `products/${s3Key}`,
        Body: fileContent,
        ContentType: "image/jpeg",
    };
    await s3.upload(params).promise();
    return `${baseImgUrl}/${s3Key}`;
}

export default uploadImage;