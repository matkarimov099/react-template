import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckIcon, XIcon, InfoIcon, AlertTriangleIcon } from "lucide-react";

export function ThemeShowcase() {
  return (
    <div className="p-6 space-y-8 bg-ios-background text-ios-label">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-ios-label font-[var(--font-sans)]">
          iOS Design System Showcase
        </h1>
        <p className="text-ios-muted">
          Apple Human Interface Guidelines asosidagi professional tema
        </p>
      </div>

      {/* iOS Color Palette */}
      <Card className="hover-lift bg-ios-card border-ios shadow-ios-md">
        <CardHeader>
          <CardTitle className="text-ios-label">iOS System Colors</CardTitle>
          <CardDescription className="text-ios-muted">
            Apple HIG asosidagi system ranglar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-16 bg-[var(--system-blue)] rounded-ios-md shadow-ios-sm"></div>
              <p className="text-sm font-medium text-ios-label">System Blue</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-[var(--system-green)] rounded-ios-md shadow-ios-sm"></div>
              <p className="text-sm font-medium text-ios-label">System Green</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-[var(--system-red)] rounded-ios-md shadow-ios-sm"></div>
              <p className="text-sm font-medium text-ios-label">System Red</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-[var(--system-yellow)] rounded-ios-md shadow-ios-sm"></div>
              <p className="text-sm font-medium text-ios-label">
                System Yellow
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Colors */}
      <Card className="hover-lift bg-ios-card border-ios shadow-ios-md">
        <CardHeader>
          <CardTitle className="text-ios-label">Status Indicators</CardTitle>
          <CardDescription className="text-ios-muted">
            iOS-style status va feedback ranglari
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2 p-3 rounded-ios-md bg-[color-mix(in_srgb,var(--system-green)_14%,var(--secondaryBackground)_86%)]">
              <CheckIcon className="h-5 w-5 text-[var(--system-green)]" />
              <span className="text-[var(--system-green)] font-medium">
                Success
              </span>
            </div>
            <div className="flex items-center space-x-2 p-3 rounded-ios-md bg-[color-mix(in_srgb,var(--system-yellow)_14%,var(--secondaryBackground)_86%)]">
              <AlertTriangleIcon className="h-5 w-5 text-[var(--system-yellow)]" />
              <span className="text-[var(--system-yellow)] font-medium">
                Warning
              </span>
            </div>
            <div className="flex items-center space-x-2 p-3 rounded-ios-md bg-[color-mix(in_srgb,var(--system-red)_14%,var(--secondaryBackground)_86%)]">
              <XIcon className="h-5 w-5 text-[var(--system-red)]" />
              <span className="text-[var(--system-red)] font-medium">
                Error
              </span>
            </div>
            <div className="flex items-center space-x-2 p-3 rounded-ios-md bg-[color-mix(in_srgb,var(--system-cyan)_14%,var(--secondaryBackground)_86%)]">
              <InfoIcon className="h-5 w-5 text-[var(--system-cyan)]" />
              <span className="text-[var(--system-cyan)] font-medium">
                Info
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* iOS Buttons */}
      <Card className="hover-lift bg-ios-card border-ios shadow-ios-md">
        <CardHeader>
          <CardTitle className="text-ios-label">iOS Button Styles</CardTitle>
          <CardDescription className="text-ios-muted">
            iOS HIG-compliant button variants
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button className="hover-lift">Primary Button</Button>
            <Button variant="secondary" className="hover-lift">
              Secondary
            </Button>
            <Button variant="outline" className="hover-lift">
              Outline
            </Button>
            <Button variant="ghost" className="hover-lift">
              Ghost
            </Button>
            <Button variant="destructive" className="hover-lift">
              Destructive
            </Button>
          </div>
          <Separator className="bg-ios border-ios" />
          <div className="flex flex-wrap gap-3">
            <Button size="xs" className="hover-lift">
              Extra Small
            </Button>
            <Button size="sm" className="hover-lift">
              Small
            </Button>
            <Button size="md" className="hover-lift">
              Medium
            </Button>
            <Button size="lg" className="hover-lift">
              Large
            </Button>
            <Button size="xl" className="hover-lift">
              Extra Large
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* iOS Vibrancy Effects */}
      <Card className="hover-lift bg-ios-card border-ios shadow-ios-md">
        <CardHeader>
          <CardTitle className="text-ios-label">iOS Vibrancy Effects</CardTitle>
          <CardDescription className="text-ios-muted">
            Backdrop blur va vibrancy effects
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-24 bg-ios-card rounded-ios-lg flex items-center justify-center backdrop-blur-[10px] saturate-[150%] border-ios">
              <span className="text-ios-label font-medium">Card Vibrancy</span>
            </div>
            <div className="h-24 bg-ios-popover rounded-ios-lg flex items-center justify-center backdrop-blur-[10px] saturate-[150%] border-ios">
              <span className="text-ios-label font-medium">
                Popover Vibrancy
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* iOS Glass Effect */}
      <Card className="bg-ios-popover border-ios shadow-ios-lg backdrop-blur-[10px] saturate-[150%] hover-lift">
        <CardHeader>
          <CardTitle className="text-ios-label">iOS Glass Effect</CardTitle>
          <CardDescription className="text-ios-muted">
            Authentic iOS vibrancy and transparency
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Badge
              variant="secondary"
              className="bg-[var(--secondaryBackground)] text-ios-label border-ios"
            >
              iOS Glass
            </Badge>
            <p className="text-sm text-ios-muted leading-[1.35]">
              This card demonstrates iOS-style vibrancy with backdrop blur and
              subtle transparency effects, following Apple's Human Interface
              Guidelines.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
