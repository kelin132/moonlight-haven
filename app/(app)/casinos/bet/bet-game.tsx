"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Coins, Dice5 } from "lucide-react"
import { cn } from "@/lib/utils"

// Roll 1-100. Player wins if roll > threshold. Lower win-chance => higher payout.
export function BetGame({ initialCoins }: { initialCoins: number }) {
  const [coins, setCoins] = useState(initialCoins)
  const [wager, setWager] = useState(50)
  const [threshold, setThreshold] = useState(50)
  const [rolling, setRolling] = useState(false)
  const [lastRoll, setLastRoll] = useState<number | null>(null)
  const [message, setMessage] = useState<{ text: string; win: boolean } | null>(null)

  const winChance = 100 - threshold
  const multiplier = winChance > 0 ? Math.max(1.1, Number((95 / winChance).toFixed(2))) : 1
  const validWager = wager > 0 && wager <= coins

  function play() {
    if (rolling || !validWager || winChance <= 0) return
    setRolling(true)
    setMessage(null)
    setCoins((c) => c - wager)

    let ticks = 0
    const interval = setInterval(() => {
      setLastRoll(Math.floor(Math.random() * 100) + 1)
      ticks++
      if (ticks > 10) {
        clearInterval(interval)
        const roll = Math.floor(Math.random() * 100) + 1
        setLastRoll(roll)
        if (roll > threshold) {
          const prize = Math.floor(wager * multiplier)
          setCoins((v) => v + prize)
          setMessage({ text: `Rolled ${roll} — you won ${prize} coins!`, win: true })
        } else {
          setMessage({ text: `Rolled ${roll} — you lost the wager.`, win: false })
        }
        setRolling(false)
      }
    }, 90)
  }

  return (
    <Card className="glass overflow-hidden">
      <CardContent className="flex flex-col gap-6 p-8">
        <div className="flex items-center justify-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary">
          <Coins className="size-4" />
          <span className="font-semibold tabular-nums">{coins.toLocaleString()}</span>
          <span className="text-primary/70">coins</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div
            className={cn(
              "flex size-28 items-center justify-center rounded-3xl border bg-card/60 text-4xl font-bold tabular-nums shadow-inner",
              rolling && "animate-pulse",
            )}
          >
            {lastRoll ?? "—"}
          </div>
          <p className="text-xs text-muted-foreground">Roll higher than your target to win</p>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="wager">Wager</Label>
            <Input
              id="wager"
              type="number"
              min={1}
              max={coins}
              value={wager}
              onChange={(e) => setWager(Math.max(0, Number(e.target.value)))}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="threshold">Target: roll above {threshold}</Label>
              <span className="text-xs text-muted-foreground">
                {winChance}% chance · {multiplier}x
              </span>
            </div>
            <input
              id="threshold"
              type="range"
              min={1}
              max={95}
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
        </div>

        <div className="h-5 text-center text-sm">
          {message ? (
            <span className={message.win ? "font-medium text-primary" : "text-muted-foreground"}>{message.text}</span>
          ) : null}
        </div>

        <Button size="lg" onClick={play} disabled={rolling || !validWager} className="w-full">
          <Dice5 className={cn("size-4", rolling && "animate-spin")} />
          {coins <= 0 ? "Out of coins" : !validWager ? "Enter a valid wager" : "Roll the dice"}
        </Button>
      </CardContent>
    </Card>
  )
}
