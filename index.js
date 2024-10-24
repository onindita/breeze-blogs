import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
let articleId = 3;
let arrayOfArticle = [];

app.use(express.static("public/"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log(__dirname);
  res.render(__dirname + "/views/index.ejs");
});
app.get("/posts", (req, res) => {
  res.render("posts.ejs", {
    array: arrayOfArticle,
  });
});

app.get("/article/:id", (req, res) => {
  let id = req.params.id;
  let articles = arrayOfArticle.filter((a) => a.id == id);

  res.render("article.ejs", {
    article: articles[0],
  });
});

app.get("/delete/:id", (req, res) => {
  arrayOfArticle = arrayOfArticle.filter((a) => a.id != req.params.id);
  res.redirect("/posts");
});

app.get("/create", (req, res) => {
  res.render(__dirname + "/views/create.ejs");
});

app.get("/update/:id", (req, res) => {
  let articles = arrayOfArticle.filter((a) => a.id == req.params.id);
  res.render("update.ejs", {
    article: articles[0],
  });
});

app.post("/save/:id", (req, res) => {
  const date = new Date();
  let today = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();

  arrayOfArticle = arrayOfArticle.filter((a) => a.id != req.params.id);

  arrayOfArticle.push({
    id: parseInt(req.params.id),
    title: req.body.title,
    content: req.body.content,
    date: today,
  });

  res.redirect(`/article/${req.params.id}`);
});

app.post("/submit", (req, res) => {
  const date = new Date();
  let today = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();

  arrayOfArticle.push({
    id: articleId++,
    title: req.body.title,
    content: req.body.content,
    date: today,
  });
  console.log(arrayOfArticle);
  res.redirect("/posts");
});

app.get("/about", (req, res) => {
  res.render(__dirname + "/views/about.ejs");
});

app.get("/contact", (req, res) => {
  res.render(__dirname + "/views/contact.ejs");
});

app.post("/contact-submit", (req, res) => {
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server started at port ${port}...`);
});

// Default articles
arrayOfArticle.push({
  id: 0,
  title: "Alien Truth",
  content: `If there were intelligent beings elsewhere in the universe, they'd share certain truths in common with us. The truths of mathematics would be the same, because they're true by definition. Ditto for the truths of physics; the mass of a carbon atom would be the same on their planet. But I think we'd share other truths with aliens besides the truths of math and physics, and that it would be worthwhile to think about what these might be.

For example, I think we'd share the principle that a controlled experiment testing some hypothesis entitles us to have proportionally increased belief in it. It seems fairly likely, too, that it would be true for aliens that one can get better at something by practicing. We'd probably share Occam's razor. There doesn't seem anything specifically human about any of these ideas.

We can only guess, of course. We can't say for sure what forms intelligent life might take. Nor is it my goal here to explore that question, interesting though it is. The point of the idea of alien truth is not that it gives us a way to speculate about what forms intelligent life might take, but that it gives us a threshold, or more precisely a target, for truth. If you're trying to find the most general truths short of those of math or physics, then presumably they'll be those we'd share in common with other forms of intelligent life.

Alien truth will work best as a heuristic if we err on the side of generosity. If an idea might plausibly be relevant to aliens, that's enough. Justice, for example. I wouldn't want to bet that all intelligent beings would understand the concept of justice, but I wouldn't want to bet against it either.

The idea of alien truth is related to Erdos's idea of God's book. He used to describe a particularly good proof as being in God's book, the implication being (a) that a sufficiently good proof was more discovered than invented, and (b) that its goodness would be universally recognized. If there's such a thing as alien truth, then there's more in God's book than math.

What should we call the search for alien truth? The obvious choice is "philosophy." Whatever else philosophy includes, it should probably include this. I'm fairly sure Aristotle would have thought so. One could even make the case that the search for alien truth is, if not an accurate description of philosophy, a good definition for it. I.e. that it's what people who call themselves philosophers should be doing, whether or not they currently are. But I'm not wedded to that; doing it is what matters, not what we call it.

We may one day have something like alien life among us in the form of AIs. And that may in turn allow us to be precise about what truths an intelligent being would have to share with us. We might find, for example, that it's impossible to create something we'd consider intelligent that doesn't use Occam's razor. We might one day even be able to prove that. But though this sort of research would be very interesting, it's not necessary for our purposes, or even the same field; the goal of philosophy, if we're going to call it that, would be to see what ideas we come up with using alien truth as a target, not to say precisely where the threshold of it is. Those two questions might one day converge, but they'll converge from quite different directions, and till they do, it would be too constraining to restrict ourselves to thinking only about things we're certain would be alien truths. Especially since this will probably be one of those areas where the best guesses turn out to be surprisingly close to optimal. (Let's see if that one does.)

Whatever we call it, the attempt to discover alien truths would be a worthwhile undertaking. And curiously enough, that is itself probably an alien truth.

Source: https://www.paulgraham.com/alien.html 
`,
  date:
    new Date().getMonth() +
    "/" +
    new Date().getDate() +
    "/" +
    new Date().getFullYear(),
});

arrayOfArticle.push({
  id: 1,
  title: "The Real Reason to End the Death Penalty",
  content: `When intellectuals talk about the death penalty, they talk about things like whether it's permissible for the state to take someone's life, whether the death penalty acts as a deterrent, and whether more death sentences are given to some groups than others. But in practice the debate about the death penalty is not about whether it's ok to kill murderers. It's about whether it's ok to kill innocent people, because at least 4% of people on death row are innocent.

When I was a kid I imagined that it was unusual for people to be convicted of crimes they hadn't committed, and that in murder cases especially this must be very rare. Far from it. Now, thanks to organizations like the Innocence Project, we see a constant stream of stories about murder convictions being overturned after new evidence emerges. Sometimes the police and prosecutors were just very sloppy. Sometimes they were crooked, and knew full well they were convicting an innocent person.

Kenneth Adams and three other men spent 18 years in prison on a murder conviction. They were exonerated after DNA testing implicated three different men, two of whom later confessed. The police had been told about the other men early in the investigation, but never followed up the lead.

Keith Harward spent 33 years in prison on a murder conviction. He was convicted because "experts" said his teeth matched photos of bite marks on one victim. He was exonerated after DNA testing showed the murder had been committed by another man, Jerry Crotty.

Ricky Jackson and two other men spent 39 years in prison after being convicted of murder on the testimony of a 12 year old boy, who later recanted and said he'd been coerced by police. Multiple people have confirmed the boy was elsewhere at the time. The three men were exonerated after the county prosecutor dropped the charges, saying "The state is conceding the obvious."

Alfred Brown spent 12 years in prison on a murder conviction, including 10 years on death row. He was exonerated after it was discovered that the assistant district attorney had concealed phone records proving he could not have committed the crimes.

Glenn Ford spent 29 years on death row after having been convicted of murder. He was exonerated after new evidence proved he was not even at the scene when the murder occurred. The attorneys assigned to represent him had never tried a jury case before.

Cameron Willingham was actually executed in 2004 by lethal injection. The "expert" who testified that he deliberately set fire to his house has since been discredited. A re-examination of the case ordered by the state of Texas in 2009 concluded that "a finding of arson could not be sustained."

Rich Glossip has spent 20 years on death row after being convicted of murder on the testimony of the actual killer, who escaped with a life sentence in return for implicating him. In 2015 he came within minutes of execution before it emerged that Oklahoma had been planning to kill him with an illegal combination of drugs. They still plan to go ahead with the execution, perhaps as soon as this summer, despite new evidence exonerating him.

I could go on. There are hundreds of similar cases. In Florida alone, 29 death row prisoners have been exonerated so far.

Far from being rare, wrongful murder convictions are very common. Police are under pressure to solve a crime that has gotten a lot of attention. When they find a suspect, they want to believe he's guilty, and ignore or even destroy evidence suggesting otherwise. District attorneys want to be seen as effective and tough on crime, and in order to win convictions are willing to manipulate witnesses and withhold evidence. Court-appointed defense attorneys are overworked and often incompetent. There's a ready supply of criminals willing to give false testimony in return for a lighter sentence, suggestible witnesses who can be made to say whatever police want, and bogus "experts" eager to claim that science proves the defendant is guilty. And juries want to believe them, since otherwise some terrible crime remains unsolved.

This circus of incompetence and dishonesty is the real issue with the death penalty. We don't even reach the point where theoretical questions about the moral justification or effectiveness of capital punishment start to matter, because so many of the people sentenced to death are actually innocent. Whatever it means in theory, in practice capital punishment means killing innocent people.

Source: https://www.paulgraham.com/real.html 
`,
  date:
    new Date().getMonth() +
    "/" +
    new Date().getDate() +
    "/" +
    new Date().getFullYear(),
});
arrayOfArticle.push({
  id: 2,
  title: "The Four Quadrants of Conformism",
  content: `One of the most revealing ways to classify people is by the degree and aggressiveness of their conformism. Imagine a Cartesian coordinate system whose horizontal axis runs from conventional-minded on the left to independent-minded on the right, and whose vertical axis runs from passive at the bottom to aggressive at the top. The resulting four quadrants define four types of people. Starting in the upper left and going counter-clockwise: aggressively conventional-minded, passively conventional-minded, passively independent-minded, and aggressively independent-minded.

I think that you'll find all four types in most societies, and that which quadrant people fall into depends more on their own personality than the beliefs prevalent in their society. [1]

Young children offer some of the best evidence for both points. Anyone who's been to primary school has seen the four types, and the fact that school rules are so arbitrary is strong evidence that which quadrant people fall into depends more on them than the rules.

The kids in the upper left quadrant, the aggressively conventional-minded ones, are the tattletales. They believe not only that rules must be obeyed, but that those who disobey them must be punished.

The kids in the lower left quadrant, the passively conventional-minded, are the sheep. They're careful to obey the rules, but when other kids break them, their impulse is to worry that those kids will be punished, not to ensure that they will.

The kids in the lower right quadrant, the passively independent-minded, are the dreamy ones. They don't care much about rules and probably aren't 100% sure what the rules even are.

And the kids in the upper right quadrant, the aggressively independent-minded, are the naughty ones. When they see a rule, their first impulse is to question it. Merely being told what to do makes them inclined to do the opposite.

When measuring conformism, of course, you have to say with respect to what, and this changes as kids get older. For younger kids it's the rules set by adults. But as kids get older, the source of rules becomes their peers. So a pack of teenagers who all flout school rules in the same way are not independent-minded; rather the opposite.

In adulthood we can recognize the four types by their distinctive calls, much as you could recognize four species of birds. The call of the aggressively conventional-minded is "Crush <outgroup>!" (It's rather alarming to see an exclamation point after a variable, but that's the whole problem with the aggressively conventional-minded.) The call of the passively conventional-minded is "What will the neighbors think?" The call of the passively independent-minded is "To each his own." And the call of the aggressively independent-minded is "Eppur si muove."

The four types are not equally common. There are more passive people than aggressive ones, and far more conventional-minded people than independent-minded ones. So the passively conventional-minded are the largest group, and the aggressively independent-minded the smallest.

Since one's quadrant depends more on one's personality than the nature of the rules, most people would occupy the same quadrant even if they'd grown up in a quite different society.

Source: https://www.paulgraham.com/conformism.html `,
  date:
    new Date().getMonth() +
    "/" +
    new Date().getDate() +
    "/" +
    new Date().getFullYear(),
});
