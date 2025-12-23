export class CollisionManager {
    constructor() {
    }

    // Simple AABB overlap check
    check(a, b) {
        return (
            a.x < b.x + b.w &&
            a.x + a.w > b.x &&
            a.y < b.y + b.h &&
            a.y + a.h > b.y
        );
    }

    resolve(entityManager) {
        const entities = entityManager.getAll();

        // Naive O(N^2) for MVP is fine for now
        for (let i = 0; i < entities.length; i++) {
            for (let j = i + 1; j < entities.length; j++) {
                const a = entities[i];
                const b = entities[j];

                if (a.isSolid && b.isSolid && this.check(a, b)) {
                    this.resolvePair(a, b);
                }
            }
        }
    }

    resolvePair(a, b) {
        // This is a placeholder for physics response.
        // For a platformer, we usually separate the dynamic object from the static one.
        // Or if both are dynamic, push them apart.

        // Minimal logic: Identify static vs dynamic (Structural vs Functional)

        // TODO: Implement actual side-detection and resolution projection
        // console.log(`Collision between ${a.type} and ${b.type}`);
    }
}
