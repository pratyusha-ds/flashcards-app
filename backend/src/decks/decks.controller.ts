import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { DecksService } from './decks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller()
export class DecksController {
  constructor(private decksService: DecksService) {}

  @Post('decks')
  createDeck(@Body() body, @Request() req) {
    return this.decksService.createDeck(req.user.userId, body.title);
  }

  @Get('decks')
  getUserDecks(@Request() req) {
    return this.decksService.getUserDecks(req.user.userId);
  }

  // @Put('decks/:id')
  // updateDeck(@Param('id') id: string, @Body() body) {
  //   return this.decksService.updateDeck(Number(id), body.title);
  // }

  @Delete('decks/:id')
  deleteDeck(@Param('id') id: string) {
    return this.decksService.deleteDeck(Number(id));
  }

  @Post('decks/:deckId/cards')
  createCard(@Param('deckId') deckId: string, @Body() body) {
    return this.decksService.createCard(
      Number(deckId),
      body.question,
      body.answer,
    );
  }

  @Get('decks/:deckId/cards')
  getCards(@Param('deckId') deckId: string) {
    return this.decksService.getCards(Number(deckId));
  }

  // @Put('cards/:cardId')
  // updateCard(@Param('cardId') cardId: string, @Body() body) {
  //   return this.decksService.updateCard(
  //     Number(cardId),
  //     body.question,
  //     body.answer,
  //   );
  // }

  @Delete('cards/:cardId')
  deleteCard(@Param('cardId') cardId: string) {
    return this.decksService.deleteCard(Number(cardId));
  }

  @Get('decks/:deckId/quiz')
  getQuiz(@Param('deckId') deckId: string) {
    return this.decksService.getDueCards(Number(deckId));
  }

  @Post('cards/:cardId/answer')
  answerCard(
    @Param('cardId') cardId: string,
    @Body() body: { correct: boolean },
  ) {
    return this.decksService.answerCard(Number(cardId), body.correct);
  }
}
