"use client"

import React, { useState } from 'react'
import styles from './TodoList.module.scss'

export default function TodoList() {
  const [tasks, setTasks] = useState([])
  const [completedTasks, setCompletedTasks] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newTask, setNewTask] = useState('')
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState(null)

  const toggleTaskCompletion = (id) => {
    const taskToToggle = tasks.find((task) => task.id === id) || completedTasks.find((task) => task.id === id)

    if (taskToToggle) {
      if (!taskToToggle.completed) {
        setTasks(tasks.filter((task) => task.id !== id))
        setCompletedTasks([...completedTasks, { ...taskToToggle, completed: true }])
      } else {
        setCompletedTasks(completedTasks.filter((task) => task.id !== id))
        setTasks([...tasks, { ...taskToToggle, completed: false }])
      }
    }
  }

  const deleteTask = () => {
    if (taskToDelete) {
      setTasks(tasks.filter((task) => task.id !== taskToDelete.id))
      setCompletedTasks(completedTasks.filter((task) => task.id !== taskToDelete.id))
      closeDeleteModal()
    }
  }

  const openDeleteModal = (task) => {
    setTaskToDelete(task)
    setIsDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setTaskToDelete(null)
    setIsDeleteModalOpen(false)
  }

  const addTask = () => {
    if (!newTask.trim()) return
    const newTaskItem = { id: tasks.length + completedTasks.length + 1, text: newTask, completed: false }
    setTasks([...tasks, newTaskItem])
    setIsModalOpen(false)
    setNewTask('')
  }

  return (
    <>
      <div className={styles.todoList}>
        <h3 className={styles.header}>Suas tarefas de hoje</h3>
        <ul className={styles.taskList}>
          {tasks.map((task) => (
            <li key={task.id} className={styles.taskItem}>
              <input
                type="checkbox"
                className={styles.checkbox}
                id={`task-${task.id}`}
                checked={false}
                onChange={() => toggleTaskCompletion(task.id)}
              />
              <label htmlFor={`task-${task.id}`} className={styles.customCheckbox}></label>
              <span className={styles.taskText}>{task.text}</span>
              <button className={styles.deleteBtn} onClick={() => openDeleteModal(task)}>
                <img src="images/trash.svg" alt="Deletar" />
              </button>
            </li>
          ))}
        </ul>

        <div className={styles.completedTasksSection}>
          <h3 className={styles.header}>Tarefas finalizadas</h3>
          {completedTasks.length > 0 && (
            <ul className={styles.completedTasksList}>
              {completedTasks.map((task) => (
                <li key={task.id} className={styles.completedTaskItem}>
                  <input
                    type="checkbox"
                    id={`completed-task-${task.id}`}
                    checked
                    onChange={() => toggleTaskCompletion(task.id)}
                    className={styles.checkbox}
                  />
                  <label htmlFor={`completed-task-${task.id}`} className={styles.customCheckbox}></label>
                  <span className={styles.taskText}>{task.text}</span>
                  <button className={styles.deleteBtn} onClick={() => openDeleteModal(task)}>
                    <img src="images/trash.svg" alt="Deletar" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <button className={styles.addTaskBtn} onClick={() => setIsModalOpen(true)}>Adicionar nova tarefa</button>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Nova tarefa</h3>
            <h4>Título</h4>
            <input
              type="text"
              placeholder="Digite"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className={styles.modalInput}
            />
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={() => setIsModalOpen(false)}>Cancelar</button>
              <button className={styles.addBtn} onClick={addTask}>Adicionar</button>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={`${styles.modal} ${styles.deleteModal}`}>
            <h3>Deletar tarefa</h3>
            <p>Tem certeza que você deseja deletar essa tarefa?</p>
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={closeDeleteModal}>Cancelar</button>
              <button className={`${styles.addBtn} ${styles.deleteBtn}`} onClick={deleteTask}>Deletar</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
