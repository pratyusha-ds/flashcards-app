import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class DecksService {
  async createDeck(userId: number, title: string) {
    return prisma.deck.create({
      data: { title, userId },
    });
  }

  async getUserDecks(userId: number) {
    return prisma.deck.findMany({ where: { userId } });
  }

  // async updateDeck(deckId: number, title: string) {
  //   return prisma.deck.update({ where: { id: deckId }, data: { title } });
  // }

  async deleteDeck(deckId: number) {
    return prisma.deck.delete({ where: { id: deckId } });
  }

  async createCard(deckId: number, question: string, answer: string) {
    return prisma.card.create({
      data: { deckId, question, answer },
    });
  }

  async getCards(deckId: number) {
    return prisma.card.findMany({ where: { deckId } });
  }

  // async updateCard(cardId: number, question: string, answer: string) {
  //   return prisma.card.update({
  //     where: { id: cardId },
  //     data: { question, answer },
  //   });
  // }

  async deleteCard(cardId: number) {
    return prisma.card.delete({ where: { id: cardId } });
  }

  async getDueCards(deckId: number) {
    const now = new Date();
    return prisma.card.findMany({
      where: {
        deckId,
        dueDate: { lte: now },
      },
    });
  }

  async answerCard(cardId: number, correct: boolean) {
    const card = await prisma.card.findUnique({ where: { id: cardId } });
    if (!card) throw new NotFoundException('Card not found');

    const easeFactor = Math.max(1.3, card.easeFactor + (correct ? 0.1 : -0.2));
    const repetitions = correct ? card.repetitions + 1 : 0;
    const interval = correct
      ? card.repetitions === 0
        ? 1
        : Math.round(card.interval * easeFactor)
      : 1;

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + interval);

    return prisma.card.update({
      where: { id: cardId },
      data: {
        easeFactor,
        repetitions,
        interval,
        dueDate,
        correct: correct ? card.correct + 1 : card.correct,
        incorrect: correct ? card.incorrect : card.incorrect + 1,
      },
    });
  }
}
