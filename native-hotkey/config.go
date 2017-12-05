package nativehotkey

import (
	"fmt"
	"os"
	"strings"
)

type hotkeyConfigMessage struct {
	HotkeyMap map[string]string `json:"hotkey_map"`
}

const (
	modCtrl  = 1 << iota
	modShift = 1 << iota
	modAlt   = 1 << iota
	modSuper = 1 << iota
)

const (
	keyPlayPause = iota
	keyStop      = iota
	keyPrevTrack = iota
	keyNextTrack = iota
)

type keyCombo struct {
	Name       string
	KeyCode    uint32
	Modifier   int
	SpecialKey int
	Mock       bool
}

func (kc keyCombo) hasModifier(modifier int) bool {
	return kc.Modifier&modifier > 0
}

func parseKeyCombo(comboString string) (kc keyCombo) {
	kc.Name = comboString
	if strings.ToLower(comboString) == "mock" {
		kc.Mock = true
		return
	}
	comboParts := strings.Split(comboString, "+")
	for i := 0; i < len(comboParts)-1; i++ {
		part := strings.ToLower(comboParts[i])
		switch part {
		case "ctrl":
			kc.Modifier |= modCtrl
		case "shift":
			kc.Modifier |= modShift
		case "alt":
			kc.Modifier |= modAlt
		case "super":
			kc.Modifier |= modSuper
		}
	}

	key := comboParts[len(comboParts)-1]
	if len(key) == 1 {
		kc.KeyCode = uint32(key[0])
	} else {
		switch strings.ToLower(key) {
		case "playpause":
			kc.SpecialKey = keyPlayPause
		case "stop":
			kc.SpecialKey = keyStop
		case "prev":
			kc.SpecialKey = keyPrevTrack
		case "next":
			kc.SpecialKey = keyNextTrack
		default:
			fmt.Fprintln(os.Stderr, "Unrecognized key combo", comboString)
			os.Exit(1)
		}
	}
	return
}
