# Sample content seed

The committed `seed.ndjson` contains 6 categories, 5 instructors, 10 courses, and 120 lessons.
Images use Sanity's `_sanityAsset` URL import syntax, so the dataset receives uploaded assets.

From the `studio` directory:

```sh
npm run seed:build
npm run seed:import
npm run dev
```

`seed:build` validates counts, unique IDs and slugs, poster assets, course modules, lesson
references, and orphaned lessons. `seed:import` uses `--replace`, so rerunning it is idempotent.
