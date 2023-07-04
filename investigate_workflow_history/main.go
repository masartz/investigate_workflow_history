package main

import (
	"context"
	"fmt"
	"os"
	"strconv"

	"github.com/google/go-github/v47/github"
	"github.com/joho/godotenv"
	"golang.org/x/oauth2"
)

func main() {
	err := godotenv.Load(".env")

	if err != nil {
		fmt.Printf("env read error: %v", err)
	}

	ctx := context.Background()
	ts := oauth2.StaticTokenSource(
		&oauth2.Token{AccessToken: os.Getenv("GITHUB_ACCESS_TOKEN")},
	)
	tc := oauth2.NewClient(ctx, ts)

	client := github.NewClient(tc)

	opt := &github.ListWorkflowRunsOptions{
		Event: "workflow_dispatch",
		ListOptions: github.ListOptions{
			PerPage: 100,
		},
	}
	wf, _, err := client.Actions.ListRepositoryWorkflowRuns(ctx, os.Getenv("REPO_OWNER"), os.Getenv("REPO_NAME"), opt)
	if err != nil {
		fmt.Printf("API call error: %v", err)
	}

	for _, v := range wf.WorkflowRuns {
		id := strconv.FormatInt(*v.WorkflowID, 10)
		if id == os.Getenv("WORKFLOW_ID") {
			fmt.Printf("start at: %s \n", v.RunStartedAt)
		}
	}
}
