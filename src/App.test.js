import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import pretty from "pretty";
import TicTacToe, { Square, Board, CalculateWinner } from "./App";

describe("DOM testing", () => {
  let container = null;
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it("should render 4 buttons with lose class", () => {
    const boards = [1, 2, 3, 4];
    const { container } = render(<Board winners={[]} board={boards} />);
    const squares = container.querySelectorAll(".number");
    expect(squares.length).toEqual(4);
    squares.forEach((square, i) => {
      expect(square.classList.contains("lose")).toBeTruthy();
      expect(square.textContent).toEqual(`${boards[i]}`);
    });
  });

  it("should render a button element with a number", () => {
    const { queryByText } = render(<Square buttonNumber={10} />);
    expect(queryByText("10").textContent).toEqual("10");
  });
});

describe("Functions testing", () => {
  it("Should be a true, squares 1, 2, and 3 are equal", () => {
    const board = ["x", "x", "x", "o", "x", "o", "x", "o", "o"];
    let [win, figure, winners] = CalculateWinner(board);
    expect(figure).toEqual("x");
    expect(win).toBeTruthy();
    expect(winners).toEqual(expect.arrayContaining([0, 1, 2]));
  });

  it("Should be a true, squares 3, 5, 7 are equal, x won", () => {
    const board = ["x", "o", "x", "o", "x", "o", "x", "o", "o"];
    let [win, figure, winners] = CalculateWinner(board);
    expect(figure).toEqual("x");
    expect(win).toBeTruthy();
    expect(winners).toEqual(expect.arrayContaining([2, 4, 6]));
  });

  it("Should be a true, squares 1, 2, and 3 are equal, o won", () => {
    const board = ["o", "o", "o", "o", "x", "x", "x", "o", "o"];
    let [win, figure] = CalculateWinner(board);
    expect(figure).toEqual("o");
  });

  it("Should be a false, no equal square", () => {
    const board = ["O", "X", "x", "X", "x", "o", "O", "o", "X"];
    let [win, figure] = CalculateWinner(board);
    expect(win).toBeFalsy();
  });
});
