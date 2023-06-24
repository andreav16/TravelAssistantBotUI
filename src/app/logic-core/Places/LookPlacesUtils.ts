export function convertToNumber(text: string): number {
  const numberMap: { [key: string]: number } = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
    eleven: 11,
    twelve: 12,
    thirteen: 13,
    fourteen: 14,
    fifteen: 15,
    sixteen: 16,
    seventeen: 17,
    eighteen: 18,
    nineteen: 19,
    twenty: 20
  };
  if(text==='a' || text==='an') return 1;
  const lowercaseText = text.toLowerCase();
  return numberMap[lowercaseText] || NaN;
}

export function placeCodeName(text: string): string {
  let codeName: string = '';
  if (text === 'restaurant' || text === 'restaurants') {
    codeName = 'catering.restaurant';
  } else if (text === 'hotel' || text === 'hotels') {
    codeName = 'accommodation.hotel';
  } else if (text === 'supermarket' || text === 'supermarkets') {
    codeName = 'commercial.supermarket';
  }
  return codeName;
}

export function getGoogleMapsURL(lat: number, lon: number): string {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
}
