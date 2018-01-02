const expect = require('expect')
const deepFreeze = require('deep-freeze')

//reducer
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, {id: action.id, text: action.text, completed: false}]
      break;
    case 'TOGGLE_TODO':
      return state.map(s => {
        if(s.id == action.id){
          return Object.assign({}, s, {}, { completed: !s.completed })
        }
        else{
          return s
        }
      })
    default:
      return state
  }
}

const testAddTodo = () => {
  const stateBefore = []
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
  }
  const stateAfter = [{
      id: 0,
      text: 'Learn Redux',
      completed: false
    }
  ]

  expect(todos(stateBefore, action)).toEqual(stateAfter)
}

const testToggleTodo = () => {
  const stateBefore = [{
      id: 0,
      text: 'Learn Redux',
      completed: false
    },
    {
      id: 1,
      text: 'Buy Milk',
      completed: false
    }
  ]

  const action = {
    type: 'TOGGLE_TODO',
    id: 1
  }

  const stateAfter = [{
      id: 0,
      text: 'Learn Redux',
      completed: false
    },
    {
      id: 1,
      text: 'Buy Milk',
      completed: true
    }
  ]

  expect(todos(stateBefore, action)).toEqual(stateAfter)
}

console.log('--------------');
testAddTodo()
testToggleTodo()
console.log('All tests passed');
