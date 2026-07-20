"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Coins, RotateCw } from "lucide-react"
import { cn } from "@/lib/utils"

const SYMBOLS = ["🌙", "⭐", "💎", "🔮", "🍒", "7️⃣"]
const WAGER = 50

function spinReel() {
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
}

export function SlotsGame({ initialCoins }: { initialCoins: number }) {
  const [coins, setCoins] = useState(initialCoins)
  const [reels, setReels] = useState<string[]>(["🌙", "⭐", "💎"])
  const [spinning, setSpinning] = useState(false)
  const [message, setMessage] = useState<{ text: string; win: boolean } | null>(null)

  function play() {
    if (spinning || coins < WAGER) return
    setSpinning(true)
    setMessage(null)
    setCoins((c) => c - WAGER)

    let ticks = 0
    const interval = setInterval(() => {
      setReels([spinReel(), spinReel(), spinReel()])
      ticks++
      if (ticks > 12) {
        clearInterval(interval)
        const final = [spinReel(), spinReel(), spinReel()]
        setReels(final)
        resolve(final)
        setSpinning(false)
      }
    }, 80)
  }

  function resolve(final: string[]) {
    const [a, b, c] = final
    if (a === b && b === c) {
      const prize = WAGER * 10
      setCoins((v) => v + prize)
      setMessage({ text: `Jackpot! You won ${prize} coins`, win: true })
    } else if (a === b || b === c || a === c) {
      const prize = WAGER * 2
      setCoins((v) => v + prize)
      setMessage({ text: `Nice! Two of a kind — +${prize} coins`, win: true })
    } else {
      setMessage({ text: `No match. Better luck next spin.`, win: false })
    }
  }

  return (
    <Card className="glass overflow-hidden">
      <CardContent className="flex flex-col items-center gap-6 p-8">
        <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary">
          <Coins className="size-4" />
          <span className="font-semibold tabular-nums">{coins.toLocaleString()}</span>
          <span className="text-primary/70">coins</span>
        </div>

        <div className="flex gap-3">
          {reels.map((symbol, i) => (
            <div
              key={i}
              className={cn(
                "flex size-24 items-center justify-center rounded-2xl border bg-card/60 text-5xl shadow-inner transition-transform",
                spinning && "animate-pulse",
              )}
            >
              {symbol}
            </div>
          ))}
        </div>

        <div className="h-6 text-center text-sm">
          {message ? (
            <span className={message.win ? "font-medium text-primary" : "text-muted-foreground"}>{message.text}</span>
          ) : (
            <span className="text-muted-foreground">Match 3 to hit the jackpot (10x). Two pays 2x.</span>
          )}
        </div>

        <Button size="lg" onClick={play} disabled={spinning || coins < WAGER} className="min-w-40">
          <RotateCw className={cn("size-4", spinning && "animate-spin")} />
          {coins < WAGER ? "Out of coins" : `Spin (${WAGER})`}
        </Button>
      </CardContent>
    </Card>
  )
}
