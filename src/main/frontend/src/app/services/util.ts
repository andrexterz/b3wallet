import { Injectable } from '@angular/core';

@Injectable()
export class Util {

    comparator(itemA: any, itemB: any): boolean {
        try {
            if (itemA.hasOwnProperty("id")) {
                return itemA["id"] === itemB["id"];
            } else {
                return itemA == itemB;
            }

        } catch (e) {
            return false;
        }
    }
}