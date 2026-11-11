---
title: '10k LOCs to 3k: how complexity sneaks into AI-built code'
tag: Agentic development
summary: Claude Code cut my agent prototype from 10,000 lines to 3,000 in about three hours, and the agent got better. Here is how complexity sneaks in, and the three habits we built afterwards.
date: 2026-11-12
draft: true
cover: /images/10k-lines-to-3k.png
coverAlt: Two code blocks side by side. The left one is tall and labelled 10,000 lines. The right one is about a third of the size and labelled 3,000 lines.
takeaways:
  - 'AI makes it easy to write code, and just as easy to write too much of it.'
  - 'Reviewing every change did not keep the prototype simple. Complexity arrives in many small steps that each look fine.'
  - 'An AI agent is a tactical tornado. Someone has to keep the system simple, and that someone is us.'
  - 'Three habits help: plan before you build, keep the pieces small, and give the agent a way to check its work.'
---

AI makes it easy to write code. It also makes it easy to write too much of it.

Not long ago I found out how much. I asked Claude Code to clean up an AI agent I had been building, one that can carry out tasks for users and guide them around the app. Three hours later the codebase had gone from 10,000 lines to 3,000, and the tests still passed.

The agent got better, too. The workflows that used to stop halfway when the data was messy became cleaner.

I had sensed that something was off. I had not realised how much. This article is about how complexity sneaks in, and what we changed afterwards.

## How we worked a year ago

We used Cursor in the classic IDE mode. The code editor came first, and the AI sat in a side panel. A normal session looked like this. I write a first version by hand, or I find a piece of code on Stack Overflow or in a video. I copy it, paste it into the chat, and ask the AI to continue. Then I fix what it got wrong, by hand.

It was awkward, but I do not want to blame the tool. At that time, agentic development was at a different stage. So were we.

There is also a reason for our caution. Developers my age watched this story from the start. When ChatGPT appeared in 2022, it gave answers that were completely, confidently wrong. We saw AI at its dumbest. So even when it got much better, a small voice stayed: ***can I really trust this?***

That voice made us controlling. We used one agent and watched every single change. It was like standing over a junior developer's shoulder and checking each line as it was typed. I am not saying that was wrong. But it was not efficient, and it was not smart.

## Why watching every change did not help

Here is the part that bothers me. I watched those changes. Each one looked fine. And the prototype still ended up with 7,000 lines it did not need.

John Ousterhout in his *A Philosophy of Software Design* says complexity is anything that makes a system hard to understand and hard to change. And it does not arrive in one big step. It arrives in many small ones, each looking harmless. He also has a name for a programmer who produces a lot of quick, shaky code: a tactical tornado.

I think an AI agent *is* a tactical tornado. It gets your feature working, fast, and it does not stop to ask whether the design is getting worse. Reading every line does not fix that. Someone has to keep the system simple, and it turned out that this someone is **us**.

The simplest way I can say it: less code, less room for bugs.

## The switch

Six months ago we moved to Claude Code entirely. At that time I was working on my first ever agent prototype and the thing I remember is the cleanup of that prototype. I had felt for a while that it had too much code, too many helpers and handlers. I asked Cursor to clean it up multiple times, but I could not get it done properly. Claude Code did it in one session, about three hours, and the tests kept passing. It was one of the first moments I thought: I can trust this. Not entirely, but mostly.

Then came the real change, which was a decision, not a feature. I said to myself: I know how to code, but now I trust you. Writing the code is your responsibility.

The hardest part was not learning something new. It was unlearning the feeling that a good developer writes all the code himself.

## What we do now

If the agent can be a tactical tornado, our work is to keep the system simple. For us, that became three habits. Mitchell Hashimoto describes similar ones in his essay [My AI Adoption Journey](https://mitchellh.com/writing/my-ai-adoption-journey).

**Plan before you build.** We split a vague request into planning and building. The planning is a grilling session: every open question about the feature is asked and answered before building starts. This is where we keep the design simple.

**Keep the pieces small.** We do not build a feature in one big session. We build with several agents, and the work comes back as stacked pull requests of about 800 lines each. Each one has a short summary of what changed, the main files to look at, and the steps to test by hand. A human cannot review thousands of lines at once, so we do not ask anyone to.

**Give the agent a way to check its work.** We run automatic tests, and we do manual QA ourselves before anything is merged.

Notice where the human time goes now: the beginning and the end. We plan, and we review. The middle, where the code gets written, is the part that became fast.

## Back to the prototype

When I look at that prototype now, I do not see one big mistake. I see many small changes that each made sense, and nobody asking whether the whole thing was still simple. That was the job I had not understood yet.

Today the agent writes the code, and my job is to keep it small, clear and checked. If I did it again, I would switch earlier and trust the AI a little more. The attention I spent watching every change would have been better spent on the plan and the review.

This is one team's experience, and I might be wrong about parts of it. Next time I will write about testing and review, because there is a lot to say.
