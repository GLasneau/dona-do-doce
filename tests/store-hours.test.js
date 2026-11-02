// Rodar com: node --test tests/
const test = require("node:test");
const assert = require("node:assert/strict");
const { getStoreStatus, formatHour } = require("../assets/js/store-hours.js");

// 02/11/2026 é uma segunda-feira. Todos os horários em UTC-3 (São Paulo).
const at = (isoLocal) => new Date(`${isoLocal}:00-03:00`);

test("formatHour", () => {
  assert.equal(formatHour("10:30"), "10h30");
  assert.equal(formatHour("19:00"), "19h");
});

test("segunda 12:00 → aberto, fecha às 19h", () => {
  const s = getStoreStatus(at("2026-11-02T12:00"));
  assert.equal(s.isOpen, true);
  assert.equal(s.label, "Aberto agora");
  assert.equal(s.detail, "Fecha às 19h");
});

test("segunda 10:29 → abre hoje às 10h30", () => {
  const s = getStoreStatus(at("2026-11-02T10:29"));
  assert.equal(s.isOpen, false);
  assert.equal(s.detail, "Abre hoje às 10h30");
});

test("segunda 10:30 → aberto", () => {
  assert.equal(getStoreStatus(at("2026-11-02T10:30")).isOpen, true);
});

test("sexta 19:00 → fechado, abre amanhã às 10h30", () => {
  const s = getStoreStatus(at("2026-11-06T19:00"));
  assert.equal(s.isOpen, false);
  assert.equal(s.detail, "Abre amanhã às 10h30");
});

test("sábado 16:59 → aberto, fecha às 17h", () => {
  const s = getStoreStatus(at("2026-11-07T16:59"));
  assert.equal(s.isOpen, true);
  assert.equal(s.detail, "Fecha às 17h");
});

test("sábado 17:00 → abre segunda às 10h30", () => {
  const s = getStoreStatus(at("2026-11-07T17:00"));
  assert.equal(s.isOpen, false);
  assert.equal(s.detail, "Abre segunda às 10h30");
});

test("domingo 14:00 → abre amanhã às 10h30", () => {
  const s = getStoreStatus(at("2026-11-08T14:00"));
  assert.equal(s.isOpen, false);
  assert.equal(s.detail, "Abre amanhã às 10h30");
});
