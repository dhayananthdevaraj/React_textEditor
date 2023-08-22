import * as React from "react";
import {
  render,
  waitFor,
  screen,
  fireEvent,
  cleanup,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import Editor from "../components/Editor";

function delay(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

  afterEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    cleanup();
  });


describe('test suit', () => {
  
test('renders_Editor_component_with_formatting_buttons', async() => {
  let dom;
  act(() => {
    dom = render(
      <BrowserRouter>
       <Editor />
      </BrowserRouter>
    );
    
  });
  await waitFor(() => expect(screen.getByText('A+')).toBeInTheDocument);
  await waitFor(() => expect(screen.getByText('A-')).toBeInTheDocument);
  await waitFor(() => expect(screen.getByText(/Analyse/i)).toBeInTheDocument);

});



test('checks_initial_styling_settings_for_text_area', () => {
  let dom;
  act(() => {
    dom = render(
      <BrowserRouter>
       <Editor />
      </BrowserRouter>
    );
    
const tarea=screen.getByPlaceholderText('type Something...');
const style=getComputedStyle(tarea);
expect(style.textAlign).toBe('left');
expect(style.fontSize).toBe('16px');
expect(style.textDecorationLine).toBe('');
expect(style.textTransform).toBe('capitalize');


 
  });
 

});


test('testing_initial_settings', () => {
  act(() => {
    render(
      <BrowserRouter>
        <Editor />
      </BrowserRouter>
    );
  });

  const analyseButton = screen.getByRole('button', { name: 'Analyse' });

  act(() => {
    userEvent.click(analyseButton);
  });

  const analysisTextarea = screen.getByPlaceholderText('ANALYSIS');
  const value = JSON.parse(analysisTextarea.value);

  const initialValue = {
    no_of_letters: 0,
    no_of_words: 0,
    no_of_integers: 0,
    no_of_spaces: 0,
    no_of_specialsymbols: 0,
    bold: false,
    italian: false,
    underline: false,
    quotes: false,
    currCase: 'capitalize',
    align: 'left',
    font: 16,
  };

  expect(value).toEqual(initialValue);
});

test('testing_font_button', async() => {
  let dom;
  act(() => {
    dom = render(
      <BrowserRouter>
       <Editor />
      </BrowserRouter>
    );
    
 
  });
 
  const tarea=screen.getByPlaceholderText('type Something...');
  act(()=>{
    userEvent.type(tarea,"p");
  })
  act(()=>{
    userEvent.type(tarea,"r");
  })
  act(()=>{
    userEvent.type(tarea,"a");
  })
 
 const btnAplus=screen.getByText('A+');
 const btnAminus=screen.getByText('A-');

 const btn=screen.getByText('Analyse');
 act(()=>{
 
  userEvent.dblClick(btnAplus);
  
})

act(()=>{
 
  userEvent.dblClick(btnAminus);
  
})
act(()=>{
 
  userEvent.dblClick(btnAplus);
})
act(()=>{
  userEvent.click(btn);
})

  const textarea= screen.getByPlaceholderText('ANALYSIS');
  const value=JSON.parse(textarea.value);
  expect(value.font).toBe(18);
  expect(value.no_of_letters).toBe(3);
  expect(value.no_of_words).toBe(1);
  expect(value.currCase).toBe('capitalize');


});

test('testing_bold_formatting', () => {
  let dom;
  act(() => {
    dom = render(<Editor />);
  });

  const tarea = screen.getByPlaceholderText('type Something...');
  act(() => {
    userEvent.type(tarea, "This is a test.");
  });

  const boldbtn = screen.getByTestId("bold-button");

  act(() => {
    userEvent.click(boldbtn);
  });

  const textarea = screen.getByPlaceholderText('type Something...');
  expect(textarea).toHaveStyle('font-weight: bold');

  act(() => {
    userEvent.click(boldbtn);
  });

  expect(textarea).not.toHaveStyle('font-weight: bold');
});

test('testing_italic_formatting', () => {
  let dom;
  act(() => {
    dom = render(<Editor />);
  });

  const tarea = screen.getByPlaceholderText('type Something...');
  act(() => {
    userEvent.type(tarea, "This is a test.");
  });

  const italicbtn = screen.getByTestId("italic-button");

  act(() => {
    userEvent.click(italicbtn);
  });

  const textarea = screen.getByPlaceholderText('type Something...');
  expect(textarea).toHaveStyle('font-style: italic');

  act(() => {
    userEvent.click(italicbtn);
  });

  expect(textarea).not.toHaveStyle('font-style: italic');
});




test('testing_underline_formatting', () => {
  let dom;
  act(() => {
    dom = render(<Editor />);
  });

  const tarea = screen.getByPlaceholderText('type Something...');
  act(() => {
    userEvent.type(tarea, "This is a test.");
  });

  const underlinebtn = screen.getByTestId("underline-button");

  act(() => {
    userEvent.click(underlinebtn);
  });

  const textarea = screen.getByPlaceholderText('type Something...');
  expect(textarea).toHaveStyle('text-decoration: underline');

  act(() => {
    userEvent.click(underlinebtn);
  });

  expect(textarea).not.toHaveStyle('text-decoration: underline');
});

});

