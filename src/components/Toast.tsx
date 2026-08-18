'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

interface ToastContextType {
  show: (message: string) => void
}

const ToastContext = createContext<ToastContextType>({ show: () => {} })

export function useToast() {
  return useContext(ToastContext)
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState('')
  const [visible, setVisible] = useState(false)

  const show = useCallback((msg: string) => {
    setMessage(msg)
    setVisible(true)
    setTimeout(() => setVisible(false), 2000)
  }, [])

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {visible && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm rounded-lg shadow-lg animate-fade-in">
          {message}
        </div>
      )}
    </ToastContext.Provider>
  )
}
