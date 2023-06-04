export class MaxNumberOfCheckInsError extends Error {
  constructor() {
    super("Atingiu o número máximo de check-ins.");
  }
}
