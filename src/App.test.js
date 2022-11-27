import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { v1 as uuidv1 } from 'uuid';

import App from "./App";

let mockGetFullTodoList;
let mockPostTodoList;
let mockDeleteTodoList;
let mockUpdateTodoList;

const generateTemplateTodo = () => ({
  description: "description todo",
  name: "name todo",
  status: false,
  _id: uuidv1(),
})

const FIRST_TODO = generateTemplateTodo();
const SECOND_TODO = generateTemplateTodo();
const THIRD_TODO = generateTemplateTodo();

const TODO_LIST_GET_RESPONSE = [FIRST_TODO, SECOND_TODO];
const TODO_LIST_POST_RESPONSE = [FIRST_TODO, SECOND_TODO, THIRD_TODO];
const TODO_LIST_DELETE_RESPONSE = [FIRST_TODO];
const TODO_LIST_UPDATE_RESPONSE = [FIRST_TODO, { ...SECOND_TODO, status: true }];

jest.mock("./services", () => {
  return {
    useGetFullListTodoMutation: () => {
      return [mockGetFullTodoList];
    },
    usePostTodoMutation: () => {
      return [mockPostTodoList];
    },
    useDeleteTodoMutation: () => {
      return [mockDeleteTodoList];
    },
    useUpdateTodoMutation: () => {
      return [mockUpdateTodoList];
    },
  };
});


describe("Second page", () => {

  it("should return items todo", async () => {
    mockGetFullTodoList = jest.fn().mockReturnValue({ data: TODO_LIST_GET_RESPONSE });
    render(<App />)
    const todo = await screen.findAllByTestId("item");
    expect(todo.length).toBe(2);
  });


  it("should create item todo", async () => {
    mockPostTodoList = jest
      .fn()
      .mockReturnValue({ data: TODO_LIST_POST_RESPONSE });
    
    render(<App />);
  
    const input = screen.getByPlaceholderText(/Name/i);
    fireEvent.input(input, {
      target: { value: 'name todo' }
    });
    const inputDescription = screen.getByPlaceholderText(/Description/i);
    fireEvent.input(inputDescription, {
      target: { value: 'description todo' }
    });

    await waitFor(async () => {
      const button = screen.getByTestId('addId');
      await fireEvent.click(button);
    });

    await waitFor(async () => {
      const todo = await screen.findAllByTestId("item");
      expect(todo.length).toBe(3);
    });
  });


  it("should delete items todo", async () => {
    mockDeleteTodoList = jest
      .fn()
      .mockReturnValue({ data: TODO_LIST_DELETE_RESPONSE });
    
    render(<App />)

    await waitFor(async () => {
      const button = await screen.findByTestId(`del-${SECOND_TODO._id}`);
      await fireEvent.click(button);
    });

    await waitFor(async () => {
      const todo = await screen.findAllByTestId("item");
      expect(todo.length).toBe(1);
    })
  });

  it("should update items todo", async () => {
    mockUpdateTodoList = jest
      .fn()
      .mockReturnValue({ data: TODO_LIST_UPDATE_RESPONSE });
    
    render(<App />)

    await waitFor(async () => {
      const button = await screen.findByTestId(`up-${SECOND_TODO._id}`);
      await fireEvent.click(button);
    })

    await waitFor(async () => {
      const button = await screen.findByTestId(`up-${SECOND_TODO._id}`);
      expect(button).toHaveClass('hide-button');
    })
  });
});
