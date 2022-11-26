import { Injectable } from '@nestjs/common';

@Injectable()
export class DebugService {
  getUsersOnlyArrayAccept(botIds: number[], contractIds: number[]) {
    if (botIds?.length === 0 && contractIds?.length === 0) {
      return 'no user';
    }
    return 'has user';
  }
  getUsersNullable(botIds?: number[], contractIds?: number[]) {
    if (botIds?.length === 0 && contractIds?.length === 0) {
      return 'no user';
    }
    return 'has user';
  }
}
