import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
});

export async function uploadToS3(file: File) {
  try {
    const s3_client = new AWS.S3({
      region: process.env.NEXT_PUBLIC_AWS_REGION,
      params: {
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
      },
    });

    const target_key = `uploads/${Date.now().toString()}-${file.name.replace(
      " ",
      "-"
    )}`;

    const upload = s3_client
      .putObject({
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
        Key: target_key,
        Body: file,
      })
      .on("httpUploadProgress", function (progress) {
        console.log(
          `Uploading to S3: ${progress.loaded}/${progress.total} (${parseInt(
            ((progress.loaded * 100) / progress.total).toString()
          )} %)`
        );
      })
      .promise();

    await upload.then((data) => {
      console.log(
        `Successfully uploaded to s3://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}/${target_key}`
      );
    });

    return Promise.resolve({
      target_key,
      file_name: file.name,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getS3File(file_key: string) {
  return `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${file_key}`;
}
