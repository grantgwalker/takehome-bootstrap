/**
 * @description Represents a flash card
 * @param id: The unique identifier for the flash card (UUID)
 * @param question: The question on the flash card
 * @param answer: The answer to the question on the flash card
 * Can be used to represent a flash card in the backend
 * @param result: The result whether the user answered the question correctly
 */
export type FlashCard = {
  id: string
  question: string
  answer: string
  result?: boolean
};