package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tools/hook"
	"github.com/pocketbase/pocketbase/tools/osutils"
)

func defaultPublicDir() string {
	if osutils.IsProbablyGoRun() {
		return "./pb_public"
	}

	// Check if ./pb_public exists in current working directory
	if info, err := os.Stat("./pb_public"); err == nil && info.IsDir() {
		return "./pb_public"
	}

	// Fallback to pb_public alongside the executable
	return filepath.Join(filepath.Dir(os.Args[0]), "pb_public")
}

func main() {
	app := pocketbase.New()

	var publicDir string
	app.RootCmd.PersistentFlags().StringVar(
		&publicDir,
		"publicDir",
		defaultPublicDir(),
		"the directory to serve static files from",
	)

	var indexFallback bool
	app.RootCmd.PersistentFlags().BoolVar(
		&indexFallback,
		"indexFallback",
		true,
		"fallback the request to index.html on missing static path (SPA mode)",
	)

	// Register static route to serve files with SPA indexFallback
	// Priority 999 ensures this handler runs after PocketBase internal routes (/api/*, /_/*)
	app.OnServe().Bind(&hook.Handler[*core.ServeEvent]{
		Func: func(se *core.ServeEvent) error {
			if !se.Router.HasRoute(http.MethodGet, "/{path...}") {
				se.Router.GET("/{path...}", apis.Static(os.DirFS(publicDir), indexFallback))
			}
			return se.Next()
		},
		Priority: 999,
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
