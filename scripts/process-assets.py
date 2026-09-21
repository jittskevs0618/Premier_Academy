#!/usr/bin/env python3
"""Resize and optimise the images downloaded from the live WordPress site
into the paths this site references.

Source files come from scripts/fetch-assets.sh (or the manifest below) and land
in RAW; this script writes the web-ready versions into assets/.

    python3 scripts/process-assets.py [RAW_DIR]
"""

import os
import sys
from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "premier-assets", "raw")

# dest -> (source basename, longest-edge cap, mode)
#   "cover"   crop to the destination aspect ratio
#   "fit"     scale down, keep aspect
#   "keep"    copy at native size (logos, QR codes)
JOBS = {
    # Branding -------------------------------------------------------------
    "assets/images/logo.png":               ("2020_11_Logo.png", None, "keep"),
    "assets/images/logo-footer.png":        ("2020_11_Logo-Footer.png", None, "keep"),
    "assets/images/logo-wordmark.png":      ("2020_11_premier_logo.png", 995, "fit"),
    "assets/qr/wechat-qr.png":              ("2020_11_WeChat-Barcode.png", None, "keep"),
    "assets/qr/whatsapp-qr.png":            ("2020_11_Whatsapp-Barcode.png", None, "keep"),

    # Hero slides ----------------------------------------------------------
    "assets/images/hero/hero-1.jpg":        ("2020_11_Slide1-shutterstock_143834497.jpg", 1600, "cover:16:9"),
    "assets/images/hero/hero-2.jpg":        ("2020_11_Slide2-iStock-137858010.jpg", 1600, "cover:16:9"),
    "assets/images/hero/hero-3.jpg":        ("2020_11_Slide3-iStock-818090184.jpg", 1600, "cover:16:9"),
    "assets/images/og-image.jpg":           ("2020_11_Slide1-shutterstock_143834497.jpg", 1200, "cover:1.91:1"),

    # Service cards --------------------------------------------------------
    "assets/images/services/private-tutoring.jpg":  ("2021_01_iStock-1217682449.jpg", 800, "cover:16:10"),
    "assets/images/services/college-counseling.jpg":("2020_11_College-Counseling-Page-smaller.png", 800, "cover:16:10"),
    "assets/images/services/sat-act.jpg":           ("2020_11_library-401.png", 800, "cover:16:10"),
    "assets/images/services/ap.jpg":                ("2020_11_iStock-137858010.png", 800, "cover:16:10"),
    "assets/images/services/homework.jpg":          ("2020_11_shutterstock_407506228-1.png", 800, "cover:16:10"),
    "assets/images/services/study-abroad.jpg":      ("2020_11_iStock-155372854-1.png", 800, "cover:16:10"),
    "assets/images/services/transfer.jpg":          ("2020_11_iStock-818090184-1.png", 800, "cover:16:10"),
    "assets/images/services/summer-winter.jpg":     ("2020_11_shutterstock_477489004-scaled.jpg", 800, "cover:16:10"),
    "assets/images/services/payment.jpg":           ("2021_07_pexels-andrea-piacquadio-3807755-scaled.jpg", 800, "cover:16:10"),

    # Editorial ------------------------------------------------------------
    "assets/images/about-campus.jpg":       ("2020_11_shutterstock_759764725.jpg", 900, "cover:4:3"),
    "assets/images/honor-roll.jpg":         ("2020_11_asian-student-550.jpg", 900, "fit"),
    "assets/images/director.jpg":           ("2020_11_Campus-Director-Photo-Edited.jpg", 600, "cover:3:4"),
}

GALLERY = [
    ("2021_01_iStock-180726720-scaled.jpg", "Students collaborating in class"),
    ("2021_01_shutterstock_407506228-scaled.jpg", "After school homework session"),
    ("2021_01_iStock-1165150697-scaled.jpg", "Student photo"),
    ("2020_11_img_20130711_092604.jpg", "Summer program group outing"),
    ("2020_11_IMG_3897-scaled.jpg", "Students at Premier Academy"),
    ("2020_11_IMG_3879-scaled.jpg", "Classroom activity"),
    ("2020_11_IMG_4086-scaled.jpg", "Students at Premier Academy"),
    ("2020_11_IMG_4110.jpg", "Students at Premier Academy"),
    ("2021_01_IMG_3799-1-scaled.jpg", "Class in session"),
    ("2021_01_DSC03559.jpg", "Academy event"),
    ("2021_01_DSC03535.jpg", "Academy event"),
    ("2021_01_IMG_3783-scaled.jpg", "Students at Premier Academy"),
    ("2021_01_20150319_201457-scaled.jpg", "Evening class"),
    ("2021_01_IMG_3779-1-scaled.jpg", "Students at Premier Academy"),
    ("2021_01_IMG_3916.jpg", "Students at Premier Academy"),
    ("2021_01_20150319_204929-1-scaled.jpg", "Evening class"),
    ("2020_11_dscn9617.jpg", "Student outing"),
    ("2020_11_dscn9445.jpg", "Student outing"),
    ("2020_11_dscn9713.jpg", "Student outing"),
    ("2021_01_DSC03544-e1611729065572.jpg", "Academy event"),
    ("2021_01_ucla.jpg", "Campus visit to UCLA"),
    ("2021_01_Stanford-3.jpg", "Campus visit to Stanford"),
    ("2020_11_celebration.jpg", "Birthday celebration — elementary group class"),
    ("2020_11_20130809_142820.jpg", "Ice skating outing"),
    ("2020_11_classroom-example.jpg", "Inside a Premier Academy classroom"),
    ("2020_11_dscn9404.jpg", "Student outing"),
    ("2020_11_knottsand007.jpg", "Knott's Berry Farm trip"),
]

PARTNERS = [
    ("2020_11_Partners-College-Board.png", "College Board"),
    ("2020_11_Partners-Southern-California-Council-of-Chinese-School.png",
     "Southern California Council of Chinese Schools"),
    ("2020_11_Partners-Toast-Masters-International.png", "Toastmasters International"),
    ("2020_11_Partners-JESIE.png", "Jiangsu Education Services for International Exchange (JESIE)"),
    ("2020_11_Partners-Hillside-School.png", "Hillside School"),
    ("2020_11_Partners-TPR-English.png", "TPR English"),
    ("2020_11_Partners-US-Fine-Art.png", "US Fine Art"),
]

# Notable visitors and friends of the Academy, in the order the live page lists them.
NOTABLE = [
    ("2020_11_1-Steve-Chen-Founder-of-Youtube.jpg", "Steve Chen, co-founder of YouTube"),
    ("2020_11_2-Soong-May-Ling-and-the-Wuu-family-at-her-100-yr-old-birthday.jpg",
     "Soong May-ling with the Wuu family at her 100th birthday"),
    ("2020_11_3-Sammo-Hung-Film-Star.jpg", "Sammo Hung, film star"),
    ("2020_11_4-Ruport-Murdoch-Minister-Tian.jpg", "Rupert Murdoch and Minister Tian"),
    ("2020_11_5-Rihanna.jpg", "Rihanna"),
    ("2020_11_6-Quentin-Tarantino-and-Donnie-Yen.jpg", "Quentin Tarantino and Donnie Yen"),
    ("2020_11_7-President-Bill-Clintor.jpg", "President Bill Clinton"),
    ("2020_11_8-Nobel-Prize-winner-Yang-Zhening.jpg", "Nobel Prize winner Yang Chen-Ning"),
    ("2020_11_9-Maggie-Q.jpg", "Maggie Q"),
    ("2020_11_10-Lang-Lang.jpg", "Lang Lang, pianist"),
    ("2020_11_11-Lakers-Owner-Jerry-Buss.jpg", "Lakers owner Jerry Buss"),
    ("2020_11_12-Kenny-G.jpg", "Kenny G"),
    ("2020_11_13-Jackie-Chan.jpg", "Jackie Chan"),
    ("2020_11_14-Dr.-David-Ho-Founder-of-AIDS-Vaccine.jpg", "Dr. David Ho, AIDS researcher"),
    ("2020_11_15-Boxing-Champ-Manny-Pacquiao-scaled.jpg", "Boxing champion Manny Pacquiao"),
    ("2020_11_16-Chef-Ming-Tsai-scaled.jpg", "Chef Ming Tsai"),
    ("2020_11_17-CoCo-Lee.jpg", "CoCo Lee"),
    ("2020_11_18-Zhang-Ziyi.jpg", "Zhang Ziyi"),
    ("2020_11_19-YoYo-Ma-Cellist.jpg", "Yo-Yo Ma, cellist"),
]

COLLEGES = [
    ("2020_11_Georgetown-University-768x481-1.jpg", "georgetown"),
    ("2020_11_NYU-768x151-1.png", "nyu"),
    ("2020_11_UC-Berkeley-1-768x187-1.png", "uc-berkeley"),
    ("2020_11_Otis-School-of-Design-Logo.jpg", "otis"),
    ("2020_11_Indiana-University-High-Res-768x256-1.jpg", "indiana"),
    ("2020_11_University-of-Illinois.png", "illinois"),
    ("2020_11_UC-San-Diego-768x290-1.jpg", "uc-san-diego"),
    ("2020_11_USC-768x224-1.png", "usc"),
]

count = 0


def open_src(name):
    path = os.path.join(RAW, name)
    if not os.path.exists(path):
        print(f"  ! missing source: {name}")
        return None
    im = Image.open(path)
    return ImageOps.exif_transpose(im)


def save(im, dest):
    global count
    full = os.path.join(ROOT, dest)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    if dest.endswith(".jpg"):
        im.convert("RGB").save(full, "JPEG", quality=82, optimize=True, progressive=True)
    else:
        im.save(full, "PNG", optimize=True)
    count += 1
    kb = os.path.getsize(full) // 1024
    print(f"  + {dest}  {im.size[0]}x{im.size[1]}  {kb}KB")


def process(src_name, dest, cap, mode):
    im = open_src(src_name)
    if im is None:
        return
    if mode.startswith("cover:"):
        _, w, h = mode.split(":")
        ratio = float(w) / float(h)
        target_w = cap
        target_h = int(round(cap / ratio))
        im = ImageOps.fit(im, (target_w, target_h), Image.LANCZOS, centering=(0.5, 0.4))
    elif mode == "fit" and cap:
        im.thumbnail((cap, cap), Image.LANCZOS)
    save(im, dest)


def main():
    if not os.path.isdir(RAW):
        print(f"Source directory not found: {RAW}")
        print("Run scripts/fetch-assets.sh first, or pass the directory as an argument.")
        sys.exit(1)

    print(f"Processing from {RAW}\n")
    for dest, (src, cap, mode) in JOBS.items():
        process(src, dest, cap, mode)

    print()
    for i, (src, _alt) in enumerate(GALLERY, 1):
        process(src, f"assets/images/gallery/gallery-{i:02d}.jpg", 1400, "cover:4:3")

    print()
    for src, _name in PARTNERS:
        slug = src.replace("2020_11_Partners-", "").replace(".png", "").lower()
        process(src, f"assets/images/partners/{slug}.png", 330, "fit")

    print()
    for i, (src, _cap) in enumerate(NOTABLE, 1):
        process(src, f"assets/images/partners/notable-{i:02d}.jpg", 900, "cover:4:3")

    print()
    for src, slug in COLLEGES:
        ext = ".png" if src.endswith(".png") else ".jpg"
        process(src, f"assets/images/colleges/{slug}{ext}", 480, "fit")

    print(f"\n{count} images written.")


if __name__ == "__main__":
    main()
