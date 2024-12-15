import { Injectable } from '@angular/core';
import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import { DeleteCommand, DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { environment } from '../../environment';
import { FlashCard } from '../app.models';

@Injectable({ providedIn: 'root' })
export class FlashCardService {
  private tableName = 'FLASHCARDS_TABLE';

  dbClient = new DynamoDBClient({
    region: 'us-east-1',
    credentials: {
      accessKeyId: environment.awsAccessKeyId,     // Ideally from environment variables
      secretAccessKey: environment.awsSecretAccessKey
    }});
  docClient = DynamoDBDocumentClient.from(this.dbClient, {
  marshallOptions: {
    removeUndefinedValues: true
  },
});



  //CREATE
  async createFlashcard(flashcard: FlashCard): Promise<FlashCard> {
    await this.docClient.send(new PutCommand({
      TableName: this.tableName,
      Item: flashcard
    }));
    return flashcard;
  }

  //READ single card
  async getFlashCard(id: string): Promise<FlashCard | undefined> {
    const result = await this.docClient.send(new GetCommand({
      TableName: this.tableName,
      Key: { id }
    }));
    return result.Item as FlashCard | undefined;
  }

  //READ all cards
  async getAllFlashcards(): Promise<FlashCard[] | undefined> {
    const result = await this.docClient.send(new ScanCommand({
      TableName: this.tableName
    }));
    if(!result.Items) return [];
    return result.Items.map(item => unmarshall(item) as FlashCard) || [];
  }

  //UPDATE
  async updateFlashCard(flashcard: FlashCard): Promise<FlashCard> {
    await this.docClient.send(new UpdateCommand({
      TableName: this.tableName,
      Key: { id: flashcard.id },
      UpdateExpression: 'SET #question = :question, #answer = :answer',
      ExpressionAttributeValues: {
        ':question': flashcard.question,
        ':answer': flashcard.answer
      },
      ExpressionAttributeNames: {
        '#question': 'question',
        '#answer': 'answer'
      }
    }));

    return await this.getFlashCard(flashcard.id) as FlashCard;
  }


  //DELETE
  async deleteFlashCard(id: string): Promise<void> {
    await this.docClient.send(new DeleteCommand({
      TableName: this.tableName,
      Key: { id }
    }));
  }
}


