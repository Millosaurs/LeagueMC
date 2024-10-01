'use client'

import Image from 'next/image'
import { StaticImageData } from 'next/image';
import { useState, useEffect } from 'react'
import { ShoppingCart, X, Check, Download, Moon, Sun, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import kraken from '../imgs/kraken.png'
import demigod from '../imgs/demigod.png'
import warlord from '../imgs/warlord.png'
import gladiator from '../imgs/gladiator.png'
import sotwVault from '../imgs/Crate.png'
import goldenVault from '../imgs/Golden.png'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

interface Item {
  id: number
  name: string
  price: number
  icon: StaticImageData
  perks: string[]
  badge?: string
}

const items: Item[] = [
  { id: 1, name: "Kraken+ Rank (30 Days)", price: 50000, icon: kraken, perks: ["Access to /fly", "20 homes", "Custom nick color"], badge: "Best Value" },
  { id: 2, name: "Kraken+ Rank (Lifetime)", price: 100000, icon: kraken, perks: ["Access to /fly", "20 homes", "Custom nick color"], badge: "Most Popular" },
  { id: 3, name: "Demigod Rank", price: 45000, icon: demigod, perks: ["Access to /feed", "15 homes", "Colored chat"] },
  { id: 4, name: "Warlord Rank", price: 35000, icon: warlord, perks: ["Access to /heal", "10 homes", "Priority queue"] },
  { id: 5, name: "Gladiator Rank", price: 25000, icon: gladiator, perks: ["Access to /kit gladiator", "5 homes", "Colored name"] },
  { id: 6, name: "S.OT.W Vault", price: 7500, icon: sotwVault, perks: ["Special items", "Exclusive cosmetics"] },
  { id: 7, name: "Golden Vault", price: 5000, icon: goldenVault, perks: ["Rare items", "Golden armor set"] },
]

export default function Component() {
  const [cart, setCart] = useState<Item[]>([])
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const addToCart = (item: Item) => {
    if (!cart.some(cartItem => cartItem.id === item.id)) {
      setCart([...cart, item])
    }
  }

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const isInCart = (id: number) => cart.some(item => item.id === id)

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0)

  const downloadReceipt = () => {
    const receiptContent = `
Rank Store Receipt
------------------
${cart.map(item => `${item.name}: ${item.price.toLocaleString()} Crystals`).join('\n')}
------------------
Total: ${totalPrice.toLocaleString()} Crystals
    `.trim()

    const blob = new Blob([receiptContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'rank-store-receipt.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className={`${inter.className} min-h-screen transition-colors duration-300 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <time dateTime="2016-10-25" suppressHydrationWarning />
      <nav className={`transition-colors duration-300 ${darkMode ? 'bg-black border-white' : 'bg-white border-black'} p-4 rounded-lg shadow-lg mx-4 mt-4 border-2`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className={`text-2xl font-bold transition-colors duration-300 ${darkMode ? 'text-white' : 'text-black'}`}>LeagueMC</h1>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              className={`mr-4 transition-colors duration-300 ${darkMode ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-700'}`}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className={`transition-colors duration-300 ${darkMode ? 'bg-black text-white border-white' : 'bg-white text-black border-black'} hover:bg-gray-800 hover:text-white`}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Cart ({cart.length})
                </Button>
              </DialogTrigger>
              <DialogContent className={`transition-colors duration-300 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <DialogHeader>
                  <DialogTitle className={`transition-colors duration-300 ${darkMode ? 'text-white' : 'text-black'}`}>Your Cart</DialogTitle>
                  <DialogDescription className={`transition-colors duration-300 ${darkMode ? 'text-white' : 'text-black'}`}>
                    {cart.length === 0 ? "Your cart is empty" : `You have ${cart.length} item(s) in your cart`}
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-8 space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-2">
                      <span className="text-lg">{item.name}</span>
                      <div className="flex items-center">
                        <span className="mr-4 text-lg font-semibold">{item.price.toLocaleString()} Crystals</span>
                        <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.id)}>
                          <X className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {cart.length > 0 && (
                    <>
                      <div className="flex justify-between items-center font-bold text-xl pt-4 border-t border-white">
                        <span>Total:</span>
                        <span>{totalPrice.toLocaleString()} Crystals</span>
                      </div>
                      <Button onClick={downloadReceipt} className={`w-full transition-colors duration-300 ${darkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} text-lg py-6`}>
                        <Download className="mr-2 h-5 w-5" />
                        Download Receipt
                      </Button>
                    </>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </nav>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map((item) => (
            <Card key={item.id} className={`transition-colors duration-300 ${darkMode ? 'bg-black border-white' : 'bg-white border-black'} overflow-hidden transition-all duration-300 hover:shadow-lg ${darkMode ? 'hover:shadow-white' : 'hover:shadow-black'}`}>
              <CardHeader className="p-4 relative">
                {item.badge && (
                  <Badge className={`absolute top-2 right-2 transition-colors duration-300 ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>{item.badge}</Badge>
                )}
                <div className={`w-full aspect-square rounded-lg mb-4 flex items-center justify-center transition-colors duration-300 ${darkMode ? 'bg-black' : 'bg-white'}`}>
                  <Image 
                    src={item.icon}
                    alt={item.name}
                    width={240}
                    height={240}
                    className="object-contain"
                  />
                </div>
                <CardTitle className={`text-lg font-semibold text-center transition-colors duration-300 ${darkMode ? 'text-white' : 'text-black'}`}>{item.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-center text-2xl font-bold transition-colors duration-300 ${darkMode ? 'text-white' : 'text-black'}`}>{item.price.toLocaleString()} Crystals</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="mt-2 w-full">
                      <Info className="mr-2 h-4 w-4" />
                      View Perks
                    </Button>
                  </DialogTrigger>
                  <DialogContent className={`transition-colors duration-300 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
                    <DialogHeader>
                      <DialogTitle>{item.name} Perks</DialogTitle>
                    </DialogHeader>
                    <ul className="list-disc pl-5 mt-4">
                      {item.perks.map((perk, index) => (
                        <li key={index}>{perk}</li>
                      ))}
                    </ul>
                  </DialogContent>
                </Dialog>
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full transition-colors duration-300 ${isInCart(item.id) ? 'bg-gray-400 hover:bg-gray-400' : darkMode ? 'bg-white hover:bg-gray-200 text-black' : 'bg-black hover:bg-gray-800 text-white'}`}
                  onClick={() => addToCart(item)}
                  disabled={isInCart(item.id)}
                >
                  {isInCart(item.id) ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Added to Cart
                    </>
                  ) : (
                    'Add to Cart'
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}


// MADE BY Mlllosaurs  aka SHARAN SHRIVASTAV 
