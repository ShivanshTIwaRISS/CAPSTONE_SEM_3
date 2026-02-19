// adds custom jest matchers like toBeInTheDocument
import "@testing-library/jest-dom";

/* ---------------- MOCK AXIOS ---------------- */
jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  put: jest.fn(() => Promise.resolve({ data: {} })),
  delete: jest.fn(() => Promise.resolve({ data: {} }))
}));

/* ---------------- MOCK FIREBASE ---------------- */
jest.mock("firebase/app", () => ({
  initializeApp: jest.fn()
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({})),
  onAuthStateChanged: (_, cb) => cb(null),
  signOut: jest.fn()
}));

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(() => ({}))
}));

/* ---------------- MOCK CART CONTEXT ---------------- */
jest.mock("./context/CartContext", () => ({
  useCart: () => ({
    totalItems: 0,
    addToCart: jest.fn(),
    removeFromCart: jest.fn()
  })
}));

/* ---------------- FIX MATCHMEDIA ERROR ---------------- */
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});

/* ---------------- SILENCE REACT ROUTER WARNINGS ---------------- */
jest.spyOn(console, "warn").mockImplementation(() => {});
