namespace MinecraftAI {

    export enum AIType {
        Wander,
        Follow,
        Attack
    }

    export function createNPC(img: Image, x: number, y: number): Sprite {
        let npc = sprites.create(img, SpriteKind.Enemy)
        npc.setPosition(x, y)
        return npc
    }

    export function setAI(npc: Sprite, type: AIType, target?: Sprite) {

        game.onUpdate(function () {

            if (!npc || !npc.isHittingTile(CollisionDirection.Bottom)) {
                return
            }

            switch (type) {

                case AIType.Wander:
                    if (Math.percentChance(2)) {
                        npc.vx = randint(-30, 30)
                    }
                    break

                case AIType.Follow:
                    if (target) {
                        npc.vx = target.x > npc.x ? 20 : -20
                        npc.vy = target.y > npc.y ? 20 : -20
                    }
                    break

                case AIType.Attack:
                    if (target) {
                        npc.follow(target, 50)
                    }
                    break
            }
        })
    }

    export function minecraftGrass(): Image {
        return img`
        7777777777777777
        7777777777777777
        6666666666666666
        6666666666666666
        6666666666666666
        6666666666666666
        6666666666666666
        6666666666666666
        `
    }
}
