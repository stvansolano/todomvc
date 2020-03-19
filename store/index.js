import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const API = "https://38d6ae9f.ngrok.io";

const store = () => new Vuex.Store({
  state: {
    todos: []
  },
  getters: {
    allTodos(state) {

      if (state.todos.length == 0) {
        axios.get(`${API}/api/HttpGetTrigger`)
              .then(response => { 
                var result = response.data;
                state.todos = result;
              });
      }
      return state.todos;
    },
    activeTodos(state) {
      return state.todos.filter(todo => !todo.completed)
    },
    completedTodos(state) {
      return state.todos.filter(todo => todo.completed)
    }
  },
  mutations: {
    SET_TODOS(state, todos) {
      state.todos = todos
    },
    ADD_TODO(state, todo) {
      state.todos.push(todo)
    },
    REMOVE_TODO(state, todo) {
      var i = state.todos.indexOf(todo)
      state.todos.splice(i, 1)
    },
    FILTER_TODOS(state, value) {
      state.todos.forEach((todo) => {
        todo.completed = !value
      })
    }
  },
  actions: {
    addTodo({ commit }, todo) {
      commit('ADD_TODO', todo);
    },
    setTodos({ commit }, todos) {
      commit('SET_TODOS', todos);
    },
    removeTodo({ commit }, todo) {
      commit('REMOVE_TODO', todo);
    },
    allDone({ state, commit }) {
      var value = state.todos.filter(todo => todo.completed).length === state.todos.length;
      commit('FILTER_TODOS', value);
    },
    saveTodos({ commit }, todos) {
      //state.todo.push(state.todos);
      //commit('SET_TODOS', todos);

      //console.log(state);
      //axios.put('/api/todos', { todos: state.todos })
    },
    nuxtServerInit({ commit }, { req }) {
      commit('SET_TODOS', req.session ? (req.session.todos || []) : [])
    }
  }
})

export default store
