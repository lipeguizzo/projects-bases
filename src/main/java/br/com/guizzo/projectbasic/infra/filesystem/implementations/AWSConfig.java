package br.com.guizzo.projectbasic.infra.filesystem.implementations;

import br.com.guizzo.projectbasic.infra.filesystem.adapters.FileAdapter;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AWSConfig {

    @Value("${AWS_ACCESS_KEY_ID}")
    private String awsAccessKey;

    @Value("${AWS_SECRET_ACCESS_KEY}")
    private String awsSecretAccessKey;

    @Value("${AWS_DEFAULT_REGION}")
    private String awsDefaultRegion;

    @Value("${AWS_S3_BUCKET_NAME}")
    private String awsS3BucketName;


    @Bean
    public AmazonS3 amazonS3() {
        return AmazonS3ClientBuilder
                .standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials()))
                .withRegion(awsDefaultRegion)
                .build();
    }

    public AWSCredentials credentials() {
        return new BasicAWSCredentials(
                awsAccessKey,
                awsSecretAccessKey
        );
    }

    public void put(FileAdapter file) {
            AmazonS3 s3Client = amazonS3();

            String key = String.format("%s/%s", file.getRelativePath(), file.getName());
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(file.getLength());
            metadata.setContentType(file.getContentType());

            s3Client.putObject(new PutObjectRequest(awsS3BucketName, key, file.getContent(), metadata));
    }

    public FileAdapter get(String relativePath, String fileName){
        AmazonS3 s3Client = amazonS3();
        String key =  String.format("%s/%s", relativePath, fileName);
        S3Object s3Object = s3Client.getObject(awsS3BucketName, key);
        S3ObjectInputStream objectContent = s3Object.getObjectContent();

        return new FileAdapter(
                s3Object.getKey(),
                key,
                objectContent,
                s3Object.getObjectMetadata().getContentLength(),
                s3Object.getObjectMetadata().getContentType(),
                null
        );
    }

    public void delete(String key){
        AmazonS3 s3Client = amazonS3();
        s3Client.deleteObject(new DeleteObjectRequest(awsS3BucketName, key));
    }
}