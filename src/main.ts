import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import { environment } from './environment';

const testDbClient = new DynamoDBClient({
  region: 'us-east-1',
  credentials: {
    accessKeyId: environment.awsAccessKeyId,     // Ideally from environment variables
    secretAccessKey: environment.awsSecretAccessKey
  }});
testDbClient.send(new ScanCommand({ TableName: 'FLASHCARDS_TABLE' }))
  .then(response => response.Items?.map(item => console.log('Test response:', item)));
  
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
