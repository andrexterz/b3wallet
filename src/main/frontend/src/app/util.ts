export class Util {
    static comparator(itemA: any, itemB: any, propertyComparator?: string) {
        try {
            if (itemA.hasOwnProperty(propertyComparator)) {
                return itemA[propertyComparator] == itemB[propertyComparator];
            } else {
                return itemA == itemB;
            }

        } catch (e) {
            return false;
        }
    }
}