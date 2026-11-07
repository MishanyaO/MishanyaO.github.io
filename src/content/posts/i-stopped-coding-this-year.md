---
title: I stopped coding this year. My job got harder.
tag: Agentic development
summary: How my job changed this year, from writing code by hand with Cursor to trusting an agent with it, and what that moved onto my plate.
date: 2026-11-07
draft: true
takeaways:
  - Moving from Cursor to Claude Code was a shift in trust, not just a new tool.
  - When coding is fast, planning, specs and review become the real work.
  - Smaller stacked pull requests keep agent-written code reviewable.
  - Small apps are easy to build now; complex products still need solid engineering knowledge.
---

This year, my job changed more than I expected.

At the start of 2026 I was an ordinary software engineer, and I wrote most of my code by hand. Today I barely write any. You would think the job got easier. It did not. It got harder, and a lot more interesting.

## How we worked at the start of the year

We used Cursor, and honestly, we used it like an assistant. There was a lot going on: new features, bug fixes, the usual busy mix. And the routine for most of it went like this.

Write a first version by hand, or find a piece of code on Stack Overflow, or follow a video on how to implement something. Then copy that code, paste it into the chat sidebar, and ask the AI to continue. Then fix what it got wrong, by hand. Then repeat.

It was awkward and inconvenient. The code editor came first and the AI sat on the side. We were not very innovative about it, and I do not want to blame the tool. At that time, agentic development was at a different stage. So were we.

There is also a reason for our caution. Developers my age watched this whole story from the start. When ChatGPT appeared in 2022, you asked it something and it gave you an answer that was completely, confidently wrong. We saw AI at its dumbest. So even when it got much better, a small voice stayed: can I really trust this?

## The switch in our heads

Then we moved to Claude Code. I want to be clear: this is not a tool review. The tool mattered less than what happened in our heads.

Claude Code is deeply connected to the code. It reads it, understands it, and proposes ideas that fit. I remember the moment I saw the real impact. I thought: wow, I can actually trust this. Not entirely, but mostly. It was nothing like the AI of 2023 or 2024.

And then came the real change, which was a decision, not a feature. I said to myself: I know how to code, more or less, but now I trust you. Writing the code is your responsibility.

That is the switch. The hardest part was not learning something new. It was unlearning something old: the feeling that a good developer writes all the code himself.

## The meeting that was not about code

Not long after, about six months ago, I joined my first stakeholder meeting about product direction. It was a conversation with environmental reporting professionals for EnviroTrack, which is now live.

I came in thinking about data and structure. I left thinking about a spreadsheet with a lot of columns that many people have to fill in, and someone who has to review every row.

Our founder shapes where the product goes. I was there for the technical side: could this be simpler, and what would it take to build? Somewhere in that meeting I realised my job was changing, and that we would have to change with it.

## What trust changed

Here is what surprised me. Trusting the agent did not mean checking less. It meant checking different things, in different places.

We spend much more time on planning now. We read the specs. We check that the plan makes sense, and that each step makes sense. When coding is fast, a bad plan becomes a bad feature very quickly.

Then reviewing the result became its own problem. When an agent produces thousands of lines at once, a human cannot review that. It is not a people-friendly size. So we changed how the work comes to us: smaller stacked pull requests, around 800 lines each, with a short summary of what changed, the main files to look at, and the steps to test by hand. We do that manual QA ourselves before anything goes further.

So my week is no longer mostly typing. It is understanding the problem, planning the feature, writing the spec, and then coming back after the code exists to test and review it properly. More like a product person than a coder. That is what "product engineer" means to me now.

I will write more about testing and review in a future article, because there is a lot to say!

## My humble opinion

I think AI is very useful, and you need to be mindful with it.

I also do not believe everyone can now build anything. A small app, yes, without much knowledge, and maybe even a decent product. But a complex product that real companies depend on still needs someone who understands what is underneath: at least a solid, curious engineer who keeps learning.

That is why I am reading more this year: system design, architecture, performance. I can clearly see my own gaps, and the agent will not fill them for me.

I might be wrong about parts of this. But it is a strange year to be an engineer.

What has changed in your work?
